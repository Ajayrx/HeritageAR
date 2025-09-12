import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Camera, Globe } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [glowAnimation, setGlowAnimation] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAnimation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[Colors.background, Colors.headerBackground, Colors.background]}
          style={styles.heroGradient}
        >
          {/* Glowing India Map Placeholder */}
          <View style={[styles.mapContainer, { opacity: 0.8 + glowAnimation * 0.2 }]}>
            <MapPin size={120} color={Colors.primary} />
            <View style={styles.glowEffect} />
          </View>

          <Text style={styles.heroTitle}>Preserving India's Heritage</Text>
          <Text style={styles.heroSubtitle}>through AR</Text>

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/ar')}
            >
              <LinearGradient
                colors={['#FF6A00', '#FF8C42']}
                style={styles.buttonGradient}
              >
                <Camera size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Explore in AR</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/heritage')}
            >
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Discover India's Treasures</Text>

        <View style={styles.featureGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/heritage')}
          >
            <MapPin size={32} color="#FF6A00" />
            <Text style={styles.featureTitle}>5 Heritage Sites</Text>
            <Text style={styles.featureDescription}>Explore iconic monuments with detailed information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/ar')}
          >
            <Camera size={32} color="#FF6A00" />
            <Text style={styles.featureTitle}>AR Experience</Text>
            <Text style={styles.featureDescription}>Immersive 3D models and virtual tours</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/quiz')}
          >
            <Globe size={32} color="#FF6A00" />
            <Text style={styles.featureTitle}>Cultural Quizzes</Text>
            <Text style={styles.featureDescription}>Test your knowledge of Indian heritage</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Heritage Sites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>20+</Text>
          <Text style={styles.statLabel}>Quiz Questions</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Languages</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    opacity: 0.1,
    transform: [{ scale: 1.5 }],
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  primaryButton: {
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.buttonSecondary,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  featureGrid: {
    gap: 20,
  },
  featureCard: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
});