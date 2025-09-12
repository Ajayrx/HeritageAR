import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Globe, Settings, Award, Download, Volume2 } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  const [language] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [audio, setAudio] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const stats = {
    sitesVisited: 3,
    quizzesCompleted: 2,
    arExperiences: 5,
    streakDays: 7
  };

  const achievements = [
    { id: 1, title: 'First Visit', description: 'Visited your first heritage site', unlocked: true },
    { id: 2, title: 'Quiz Master', description: 'Completed 5 cultural quizzes', unlocked: true },
    { id: 3, title: 'AR Explorer', description: 'Used AR feature 10 times', unlocked: false },
    { id: 4, title: 'Heritage Scholar', description: 'Visited all 5 heritage sites', unlocked: false },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Heritage Explorer</Text>
            <Text style={styles.userLevel}>Level 2 • Cultural Enthusiast</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Journey</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.sitesVisited}</Text>
            <Text style={styles.statLabel}>Sites Visited</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.quizzesCompleted}</Text>
            <Text style={styles.statLabel}>Quizzes Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.arExperiences}</Text>
            <Text style={styles.statLabel}>AR Experiences</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              !achievement.unlocked && styles.achievementLocked
            ]}
          >
            <Award 
              size={24} 
              color={achievement.unlocked ? "#FF6A00" : "#666666"} 
            />
            <View style={styles.achievementInfo}>
              <Text style={[
                styles.achievementTitle,
                !achievement.unlocked && styles.achievementLockedText
              ]}>
                {achievement.title}
              </Text>
              <Text style={[
                styles.achievementDescription,
                !achievement.unlocked && styles.achievementLockedText
              ]}>
                {achievement.description}
              </Text>
            </View>
            {achievement.unlocked && (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedText}>✓</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        {/* Language Setting */}
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Globe size={24} color="#FF6A00" />
            <View>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingSubtitle}>Current: {language}</Text>
            </View>
          </View>
          <Text style={styles.settingValue}>English / हिंदी</Text>
        </TouchableOpacity>

        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Settings size={24} color="#FF6A00" />
            <View>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSubtitle}>Cultural updates and reminders</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.buttonText}
          />
        </View>

        {/* Audio Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Volume2 size={24} color="#FF6A00" />
            <View>
              <Text style={styles.settingTitle}>Audio Narration</Text>
              <Text style={styles.settingSubtitle}>Voice guides for AR experiences</Text>
            </View>
          </View>
          <Switch
            value={audio}
            onValueChange={setAudio}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.buttonText}
          />
        </View>

        {/* Offline Mode Toggle */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Download size={24} color="#FF6A00" />
            <View>
              <Text style={styles.settingTitle}>Offline Content</Text>
              <Text style={styles.settingSubtitle}>
                {offlineMode ? 'Content downloaded' : 'Download for offline access'}
              </Text>
            </View>
          </View>
          <Switch
            value={offlineMode}
            onValueChange={setOfflineMode}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.buttonText}
          />
        </View>
      </View>

      {/* Download Section */}
      {!offlineMode && (
        <View style={styles.downloadSection}>
          <Text style={styles.sectionTitle}>Offline Access</Text>
          <Text style={styles.downloadDescription}>
            Download heritage site content for offline viewing. Perfect for areas with limited connectivity.
          </Text>
          <TouchableOpacity style={styles.downloadButton}>
            <LinearGradient colors={['#FF6A00', '#FF8C42']} style={styles.buttonGradient}>
              <Download size={20} color="#FFFFFF" />
              <Text style={styles.downloadButtonText}>Download All Content (25 MB)</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Heritage AR v1.0.0</Text>
        <Text style={styles.footerSubtext}>Preserving culture through technology</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    color: Colors.primary,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statCard: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  achievementsSection: {
    padding: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  achievementLockedText: {
    color: Colors.textMuted,
  },
  unlockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedText: {
    color: Colors.buttonText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingsSection: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
    marginLeft: 15,
  },
  settingSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 15,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  downloadSection: {
    padding: 20,
  },
  downloadDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  downloadButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  downloadButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});