import { environment } from '../environments/environment';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import MapBoxDirections from '@mapbox/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Feature, FeatureCollection, LineString } from 'geojson';
import { MapService } from '../services/map.service';
import { ApiResponse } from '../interfaces/gettingRoute.interface';

interface EventType {
  lngLat: {
    lng: number;
    lat: number;
    [key: string]: number;
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent1 implements OnInit {
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  endMarker!: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v12';

  usersCurrentLatitude: number = 0;
  usersCurrentLongitude: number = 0;

  selectedLatitude!: number;
  selectedLongitude!: number;

  start: number[] = [];
  end: number[] = [];

  previousMarker: mapboxgl.Marker | null = null;

  // eslint-disable-next-line no-unused-vars
  constructor(private mapboxService: MapService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.usersCurrentLatitude = latitude;
          this.usersCurrentLongitude = longitude;
          this.start = [this.usersCurrentLongitude, this.usersCurrentLatitude];
          if (latitude && longitude) {
            // console.log(this.usersCurrentLongitude && this.usersCurrentLatitude)
            this.initializeMapAndMarker();
          }
        },
        (error) => {
          const errorMessage = `Geolocation error occurred: ${error.message}`;
          throw new Error(errorMessage);
        },
      );
    }
  }

  initializeMapAndMarker() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.usersCurrentLongitude, this.usersCurrentLatitude],
      zoom: 12,
    });

    this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
      .setLngLat([this.usersCurrentLongitude, this.usersCurrentLatitude])
      .addTo(this.map);

    this.marker.on('dragend', this.onDragEnd);

    this.addMapboxGeocoderControl();
  }

  onDragEnd = () => {
    // console.log('marker', this.marker);
    if (this.marker) {
      const lngLat = this.marker.getLngLat();
      // console.log('lnglat', lngLat);
      this.start = [lngLat.lng, lngLat.lat];
      // console.log('start', this.start)
      this.gettingRoute(this.end);
    }
  };

  addMapboxGeocoderControl() {
    this.map?.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapbox.accessToken,
        mapboxgl: mapboxgl,
      }),
    );
    this.gettingEnd();
  }

  gettingRoute(end: number[]) {
    this.end = end;
    this.mapboxService
      .getRoute(this.map, this.start, end)
      .subscribe((data: ApiResponse) => {
        const route = data.routes[0].geometry.coordinates;
        // console.log(route);
        const geojson: Feature<LineString> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        };

        if (this.map.getSource('route')) {
          (this.map.getSource('route') as mapboxgl.GeoJSONSource).setData(
            geojson,
          );
          // this.map.getSource('route').setData(geojson);
        } else {
          this.map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: geojson,
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75,
            },
          });
        }
      });
  }

  gettingEnd() {
    this.map.on('click', (event: EventType) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end: FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords,
            },
          },
        ],
      };

      const endSource = this.map?.getSource('end');
      if (endSource) {
        const geojsonSource = endSource as mapboxgl.GeoJSONSource;
        geojsonSource.setData(end);
      } else {
        if (this.map.getLayer('end')) {
          this.map.removeLayer('end');
          this.map.removeSource('end');
        }
        if (this.previousMarker) {
          this.previousMarker.remove();
        }
        this.endMarker = new mapboxgl.Marker({ color: 'blue', draggable: true })
          .setLngLat(coords as mapboxgl.LngLatLike)
          .addTo(this.map);

        this.endMarker.on('dragend', this.onBlueDragEnd);

        this.previousMarker = this.endMarker;
      }

      this.gettingRoute(coords);
    });
  }

  onBlueDragEnd = () => {
    // console.log('marker', this.endMarker);
    if (this.endMarker) {
      const lngLat = this.endMarker.getLngLat();
      // console.log('lnglat', lngLat);
      this.end = [lngLat.lng, lngLat.lat];
      // console.log('end', this.end)
      this.gettingRoute(this.end);
    }
  };
}
