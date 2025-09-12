import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera as CameraIcon, RotateCcw, Info, X, Volume2 } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function ARScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [arMode, setArMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { site } = useLocalSearchParams();
  const router = useRouter();

  const toggleCameraFacing = () => {
    setFacing((current: CameraType) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleAR = () => {
    setArMode(!arMode);
  };

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    // In a real app, this would control audio narration
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <CameraIcon size={80} color="#FF6A00" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionMessage}>
          We need your permission to use the camera for AR experiences
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <LinearGradient colors={['#FF6A00', '#FF8C42']} style={styles.buttonGradient}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {site ? `AR: ${site}` : 'AR Experience'}
          </Text>
          <TouchableOpacity style={styles.infoToggle} onPress={() => setShowInfo(!showInfo)}>
            <Info size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* AR Overlay */}
        {arMode && (
          <View style={styles.arOverlay}>
            <View style={styles.arMarker}>
              <View style={styles.markerCenter} />
              <Text style={styles.markerText}>3D Model Here</Text>
            </View>
            
            <View style={styles.infoTag}>
              <Text style={styles.infoTagTitle}>{site || 'Heritage Site'}</Text>
              <Text style={styles.infoTagSubtitle}>Tap for more information</Text>
            </View>
          </View>
        )}

        {/* Info Panel */}
        {showInfo && (
          <View style={styles.infoPanel}>
            <Text style={styles.infoPanelTitle}>AR Instructions</Text>
            <Text style={styles.infoPanelText}>
              • Point your camera at a flat surface{'\n'}
              • Tap &quot;Start AR&quot; to begin the experience{'\n'}
              • Move around to explore different angles{'\n'}
              • Tap audio icon for narration
            </Text>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.arToggleButton, arMode && styles.arToggleActive]}
            onPress={toggleAR}
          >
            <LinearGradient 
              colors={arMode ? ['#FF6A00', '#FF8C42'] : ['#333333', '#555555']} 
              style={styles.arToggleGradient}
            >
              <CameraIcon size={24} color="#FFFFFF" />
              <Text style={styles.arToggleText}>
                {arMode ? 'Stop AR' : 'Start AR'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, audioPlaying && styles.audioActive]}
            onPress={toggleAudio}
          >
            <Volume2 size={24} color={audioPlaying ? "#FF6A00" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>

        {/* Status Indicator */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: arMode ? '#00FF00' : '#FF6A00' }]} />
          <Text style={styles.statusText}>
            {arMode ? 'AR Active' : 'Camera Ready'}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  permissionButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoToggle: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  arOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCenter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6A00',
    backgroundColor: 'rgba(255, 106, 0, 0.2)',
    marginBottom: 10,
  },
  markerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6A00',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  infoTag: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6A00',
  },
  infoTagTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  infoTagSubtitle: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  infoPanel: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF6A00',
  },
  infoPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6A00',
    marginBottom: 10,
  },
  infoPanelText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    gap: 20,
  },
  controlButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  audioActive: {
    backgroundColor: 'rgba(255,106,0,0.3)',
  },
  arToggleButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  arToggleActive: {
    transform: [{ scale: 1.05 }],
  },
  arToggleGradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});