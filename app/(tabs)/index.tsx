import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Camera, Globe, Scan } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [glowAnimation, setGlowAnimation] = useState(0);
  const [pulseAnimation, setPulseAnimation] = useState(0);
  const [rotateAnimation, setRotateAnimation] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setGlowAnimation(prev => prev + 0.1);
    }, 100);

    const pulseInterval = setInterval(() => {
      setPulseAnimation(prev => prev + 0.02);
    }, 50);

    const rotateInterval = setInterval(() => {
      setRotateAnimation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => {
      clearInterval(glowInterval);
      clearInterval(pulseInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[Colors.background, Colors.headerBackground, Colors.background]}
          style={styles.heroGradient}
        >
          {/* Enhanced Glowing India Map with Rotating Chakra */}
          <View style={[styles.logoContainer, {
            opacity: 0.95 + Math.sin(glowAnimation) * 0.05,
            transform: [{ scale: 1 + Math.sin(pulseAnimation) * 0.02 }]
          }]}>
            <View style={styles.iconContainer}>
              <View style={styles.arLogoBackground}>
                <Scan size={80} color={Colors.buttonText} />
              </View>
            </View>

            {/* Subtle Glow Layers */}
            <View style={[styles.glowEffect, styles.glowLayer1, {
              opacity: 0.08 + Math.sin(glowAnimation * 0.5) * 0.03
            }]} />
            <View style={[styles.glowEffect, styles.glowLayer2, {
              opacity: 0.05 + Math.cos(glowAnimation * 0.3) * 0.02
            }]} />

            {/* Gentle Animated Rings */}
            <View style={[styles.animatedRing, styles.ring1, {
              opacity: 0.1 + Math.sin(glowAnimation * 0.4) * 0.05,
              transform: [{ scale: 1 + Math.sin(glowAnimation * 0.2) * 0.02 }]
            }]} />
            <View style={[styles.animatedRing, styles.ring2, {
              opacity: 0.08 + Math.cos(glowAnimation * 0.3) * 0.04,
              transform: [{ scale: 1.05 + Math.cos(glowAnimation * 0.25) * 0.015 }]
            }]} />
          </View>

          <Text style={styles.heroTitle}>Heritage AR</Text>
          <Text style={styles.heroSubtitle}>Explore India's Cultural Legacy</Text>

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/ar')}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                style={styles.buttonGradient}
              >
                <Camera size={24} color={Colors.buttonText} />
                <Text style={styles.primaryButtonText}>Start AR Experience</Text>
              </LinearGradient>
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
            <View style={styles.featureIconContainer}>
              <MapPin size={36} color={Colors.primary} />
              <View style={[styles.featureGlow, { opacity: 0.05 + Math.sin(glowAnimation * 0.3) * 0.02 }]} />
            </View>
            <Text style={styles.featureTitle}>5 Heritage Sites</Text>
            <Text style={styles.featureDescription}>Explore iconic monuments with detailed information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/ar')}
          >
            <View style={styles.featureIconContainer}>
              <Camera size={36} color={Colors.primary} />
              <View style={[styles.featureGlow, { opacity: 0.05 + Math.cos(glowAnimation * 0.4) * 0.02 }]} />
            </View>
            <Text style={styles.featureTitle}>AR Experience</Text>
            <Text style={styles.featureDescription}>Immersive 3D models and virtual tours</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => router.push('/quiz')}
          >
            <View style={styles.featureIconContainer}>
              <Globe size={36} color={Colors.primary} />
              <View style={[styles.featureGlow, { opacity: 0.05 + Math.sin(glowAnimation * 0.5) * 0.02 }]} />
            </View>
            <Text style={styles.featureTitle}>Cultural Quizzes</Text>
            <Text style={styles.featureDescription}>Test your knowledge of Indian heritage</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <View style={styles.statNumberContainer}>
            <Text style={styles.statNumber}>5</Text>
            <View style={[styles.statGlow, { opacity: 0.08 + Math.sin(glowAnimation * 0.3) * 0.03 }]} />
          </View>
          <Text style={styles.statLabel}>Heritage Sites</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statNumberContainer}>
            <Text style={styles.statNumber}>20+</Text>
            <View style={[styles.statGlow, { opacity: 0.08 + Math.cos(glowAnimation * 0.4) * 0.03 }]} />
          </View>
          <Text style={styles.statLabel}>Quiz Questions</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statNumberContainer}>
            <Text style={styles.statNumber}>2</Text>
            <View style={[styles.statGlow, { opacity: 0.08 + Math.sin(glowAnimation * 0.5) * 0.03 }]} />
          </View>
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
    marginBottom: 40,
    position: 'relative',
    width: 220,
    height: 220,
  },
  iconContainer: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },
  glowLayer1: {
    width: 200,
    height: 200,
    opacity: 0.15,
    top: 10,
    left: 10,
  },
  glowLayer2: {
    width: 240,
    height: 240,
    opacity: 0.1,
    top: -10,
    left: -10,
  },
  glowLayer3: {
    width: 280,
    height: 280,
    opacity: 0.05,
    top: -30,
    left: -30,
  },
  animatedRing: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 150,
    borderColor: Colors.primary,
  },
  ring1: {
    width: 220,
    height: 220,
    top: 0,
    left: 0,
  },
  ring2: {
    width: 260,
    height: 260,
    top: -20,
    left: -20,
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
    marginTop: 20,
  },
  primaryButton: {
    width: '85%',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButtonText: {
    color: Colors.buttonText,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
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
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  featureIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  featureGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
    marginTop: 20,
    backgroundColor: Colors.headerBackground,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumberContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    zIndex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});