import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Camera, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const heritageSites = [
  {
    id: 1,
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    description: 'A monument of love, this ivory-white marble mausoleum is one of the Seven Wonders of the World.',
    image: require('../../assets/images/taj_mahal.png'),
    yearBuilt: '1653',
    architect: 'Ustad Ahmad Lahauri',
    significance: 'UNESCO World Heritage Site',
    arAvailable: true,
  },
  {
    id: 2,
    name: 'Konark Sun Temple',
    location: 'Konark, Odisha',
    description: 'A 13th-century temple dedicated to the Sun God, designed as a massive stone chariot.',
    image: require('../../assets/images/konark_sun_temple.png'),
    yearBuilt: '1250',
    architect: 'King Narasimhadeva I',
    significance: 'UNESCO World Heritage Site',
    arAvailable: true,
  },
  {
    id: 3,
    name: 'Ajanta-Ellora Caves',
    location: 'Maharashtra',
    description: 'Ancient rock-cut caves showcasing Buddhist, Hindu, and Jain art and architecture.',
    image: require('../../assets/images/ajanta.png'),
    yearBuilt: '2nd Century BC - 10th Century AD',
    architect: 'Various Buddhist Monks',
    significance: 'UNESCO World Heritage Site',
    arAvailable: true,
  },
  {
    id: 4,
    name: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    description: 'A historic Hindu temple complex with stunning Dravidian architecture and colorful sculptures.',
    image: require('../../assets/images/meenakshi.png'),
    yearBuilt: '17th Century',
    architect: 'Various Nayak rulers',
    significance: 'Dravidian Architecture Marvel',
    arAvailable: true,
  },
  {
    id: 5,
    name: 'Amer Fort',
    location: 'Jaipur, Rajasthan',
    description: 'A majestic fort palace known for its artistic Hindu and Mughal architectural elements.',
    image: require('../../assets/images/amer.png'),
    yearBuilt: '1592',
    architect: 'Raja Man Singh I',
    significance: 'UNESCO World Heritage Site',
    arAvailable: true,
  },
];

interface HeritageSite {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string | number; // Can be URI string or require() number
  yearBuilt: string;
  architect: string;
  significance: string;
  arAvailable: boolean;
}

export default function HeritageScreen() {
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const router = useRouter();

  const handleARView = (site: HeritageSite) => {
    router.push(`/ar?site=${site.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Heritage Sites</Text>
        <Text style={styles.headerSubtitle}>Explore India's Cultural Treasures</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {heritageSites.map((site) => (
          <View key={site.id} style={styles.siteCard}>
            <Image 
              source={typeof site.image === 'string' ? { uri: site.image } : site.image} 
              style={styles.siteImage} 
            />

            <View style={styles.siteContent}>
              <View style={styles.siteHeader}>
                <Text style={styles.siteName}>{site.name}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={16} color="#FF6A00" />
                  <Text style={styles.siteLocation}>{site.location}</Text>
                </View>
              </View>

              <Text style={styles.siteDescription}>{site.description}</Text>

              <View style={styles.siteDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Built:</Text>
                  <Text style={styles.detailValue}>{site.yearBuilt}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Significance:</Text>
                  <Text style={styles.detailValue}>{site.significance}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.arButton}
                  onPress={() => handleARView(site)}
                >
                  <LinearGradient
                    colors={['#FF6A00', '#FF8C42']}
                    style={styles.arButtonGradient}
                  >
                    <Camera size={18} color="#FFFFFF" />
                    <Text style={styles.arButtonText}>View in AR</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                >
                  <Info size={18} color="#FF6A00" />
                  <Text style={styles.infoButtonText}>More Info</Text>
                </TouchableOpacity>
              </View>

              {selectedSite === site.id && (
                <View style={styles.expandedInfo}>
                  <Text style={styles.expandedTitle}>Additional Information</Text>
                  <View style={styles.expandedDetail}>
                    <Text style={styles.expandedLabel}>Architect/Builder:</Text>
                    <Text style={styles.expandedValue}>{site.architect}</Text>
                  </View>
                  <Text style={styles.expandedDescription}>
                    This heritage site represents a significant part of India's cultural and architectural legacy.
                    Experience its grandeur through our AR technology to get a deeper understanding of its
                    historical importance and architectural brilliance.
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.primary,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  siteCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  siteImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  siteContent: {
    padding: 20,
  },
  siteHeader: {
    marginBottom: 15,
  },
  siteName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  siteLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  siteDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  siteDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  arButton: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  arButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  arButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.buttonSecondary,
    gap: 5,
  },
  infoButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  expandedInfo: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  expandedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  expandedDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  expandedLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  expandedValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  expandedDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});