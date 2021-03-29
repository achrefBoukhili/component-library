import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Map, InfoWindow, Marker, GoogleApiWrapper
} from 'google-maps-react';
import { ButtonGroup, Button } from '@chakra-ui/core';
import { TiChevronRight, TiChevronLeft } from 'react-icons/ti';
import Loadable from 'react-loadable';
// import YoutubeContainer from '../VideoContainer/index.jsx';
// import useLazyImport from '../hooks/useLazyImport';

// const YoutubeContainer = Loadable({ loading: () => <div>loading...</div>, loader: () => import('../VideoContainer/index.jsx') });
const MapContainer = (props) => {
  const YoutubeContainer = useLazyImport(() => import('../VideoContainer/index.jsx'));
  const [markers, setMarkers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showInfo, setshowInfo] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({});
  const [activeMarkerId, setActiveMarkerId] = useState('');
  useEffect(() => {
    markers.forEach((marker) => {
      if (activeMarkerId === marker.id) {
        setVideos(marker.videos);
      }
    });
  }, [activeMarkerId, markers]);

  const onMapClicked = async (map, marker, e) => {
    if (showInfo) {
      setshowInfo(false);
    } else {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const latlng = `${lat}, ${lng}`;

      try {
        const regionInformation = await axios.get('http://localhost:3000/geoCode', {
          params: {
            latlng
          }
        });
        const videosByRegion = await axios.get('http://localhost:3000/videos', {
          params: {
            regionCode: regionInformation.data
          }
        });
        setMarkers([...markers, {
          lat,
          lng,
          id: latlng,
          videos: videosByRegion && videosByRegion.data.items
        }]);
      } catch (err) {
        throw (err);
      }
    }
  };

  const onMarkerClick = (mapProps, marker, e) => {
    const { lat, lng } = mapProps.position;
    const latlng = `${lat}, ${lng}`;
    setSelectedPosition({ lat, lng });
    setActiveMarkerId(latlng);
    setshowInfo(true);
  };

  const handleNavigation = step => (e) => {
    if (activeMarkerId) {
      let index = 0;
      while (index < markers.length - 1 && markers[index].id !== activeMarkerId) {
        index += 1;
      }
      let nextMarker = null;
      switch (step) {
        case 'forward':
          nextMarker = markers[index + 1];
          break;
        case 'backward':
          nextMarker = markers[index - 1];
          break;
        default:
          break;
      }
      if (nextMarker) {
        setSelectedPosition({ lat: nextMarker.lat, lng: nextMarker.lng });
        setActiveMarkerId(nextMarker.id);
        setshowInfo(true);
      }
    } else {
      setSelectedPosition({ lat: markers[0].lat, lng: markers[0].lng });
      setActiveMarkerId(markers[0].id);
      setshowInfo(true);
    }
  };

  return (
    <>
      <Map google={props.google} zoom={15} onClick={onMapClicked} initialCenter={{
        lat: 52.495410,
        lng: 13.431430
      }}>

        {markers && markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={onMarkerClick}
          />
        ))}
        <InfoWindow
          position={selectedPosition}
          visible={showInfo}>
          {videos && videos.map(video => (
            <YoutubeContainer youtubeId={video.id} key={video.id} />
          ))}
        </InfoWindow>
        <ButtonGroup spacing={4} className="buttonContainer">
          <Button onClick={handleNavigation('backward')} leftIcon={TiChevronLeft} variantColor="green" variant="solid">
            PREVIOUS
          </Button>
          <Button onClick={handleNavigation('forward')} rightIcon={TiChevronRight} variantColor="green" variant="solid">
            NEXT
          </Button>
        </ButtonGroup>
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBk6CAMqSo80izWvuc0YP7QyOfzW8CQ_Uo'
})(MapContainer);
