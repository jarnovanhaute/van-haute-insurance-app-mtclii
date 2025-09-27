
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { mockUser, mockInsurances } from '../data/mockData';
import { getGreeting } from '../utils/timeUtils';
import InsuranceCard from '../components/InsuranceCard';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [user] = useState(mockUser);
  const [insurances] = useState(mockInsurances);
  const greeting = getGreeting();

  const handleInsurancePress = (insuranceId: string) => {
    console.log('Opening insurance details for:', insuranceId);
    router.push(`/insurance/${insuranceId}`);
  };

  const handleAccidentReport = () => {
    console.log('Opening accident report');
    router.push('/accident-report');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Greeting */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.greeting}>{greeting},</Text>
          <Text style={commonStyles.userName}>{user.name}</Text>
        </View>

        {/* Company Branding */}
        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 24 }]}>
          <Text style={[commonStyles.text, { color: colors.white, textAlign: 'center', fontWeight: '600' }]}>
            Groep Van Haute
          </Text>
          <Text style={[commonStyles.textSecondary, { color: colors.white, textAlign: 'center', opacity: 0.8 }]}>
            Uw vertrouwde verzekeringsmakelaar
          </Text>
        </View>

        {/* Emergency Action Button */}
        <TouchableOpacity 
          style={commonStyles.emergencyButton}
          onPress={handleAccidentReport}
        >
          <Icon name="warning" size={32} color={colors.white} />
          <Text style={commonStyles.emergencyButtonText}>
            Schade melden
          </Text>
          <Text style={[commonStyles.textSecondary, { color: colors.white, opacity: 0.9, marginTop: 4 }]}>
            Ongeval of schade? Meld het hier direct
          </Text>
        </TouchableOpacity>

        {/* Insurance List */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Mijn verzekeringen</Text>
          
          {insurances.map((insurance) => (
            <InsuranceCard
              key={insurance.id}
              insurance={insurance}
              onPress={() => handleInsurancePress(insurance.id)}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Snelle acties</Text>
          
          <TouchableOpacity 
            style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}
            onPress={() => console.log('Contact broker')}
          >
            <View style={commonStyles.rowStart}>
              <Icon name="call-outline" size={24} color={colors.accent} style={commonStyles.icon} />
              <View>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Contact opnemen
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Bel uw persoonlijke makelaar
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}
            onPress={() => console.log('Request quote')}
          >
            <View style={commonStyles.rowStart}>
              <Icon name="document-text-outline" size={24} color={colors.accent} style={commonStyles.icon} />
              <View>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Offerte aanvragen
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Nieuwe verzekering nodig?
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginBottom: 32 }]}
            onPress={() => console.log('View documents')}
          >
            <View style={commonStyles.rowStart}>
              <Icon name="folder-outline" size={24} color={colors.accent} style={commonStyles.icon} />
              <View>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Mijn documenten
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Polissen en certificaten
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
