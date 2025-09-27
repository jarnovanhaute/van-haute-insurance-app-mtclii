
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { mockInsurances } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/timeUtils';
import Icon from '../../components/Icon';

export default function InsuranceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insurance = mockInsurances.find(ins => ins.id === id);

  if (!insurance) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>Verzekering niet gevonden</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getInsuranceTypeLabel = (type: string) => {
    switch (type) {
      case 'car': return 'Autoverzekering';
      case 'home': return 'Woonverzekering';
      case 'health': return 'Gezondheidsverzekering';
      case 'life': return 'Levensverzekering';
      case 'travel': return 'Reisverzekering';
      default: return 'Verzekering';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.row, { marginBottom: 24 }]}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ padding: 8, marginLeft: -8 }}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.subtitle, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Verzekeringdetails
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main Info Card */}
          <View style={commonStyles.card}>
            <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 8 }]}>
              {getInsuranceTypeLabel(insurance.type)}
            </Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
              {insurance.description}
            </Text>
            
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.text}>Polisnummer:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {insurance.policyNumber}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.text}>Maatschappij:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {insurance.provider}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.text}>Jaarpremie:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600', color: colors.accent }]}>
                {formatCurrency(insurance.premium)}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Text style={commonStyles.text}>Vervaldatum:</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {formatDate(insurance.expiryDate)}
              </Text>
            </View>
            
            <View style={commonStyles.row}>
              <Text style={commonStyles.text}>Status:</Text>
              <View style={commonStyles.rowStart}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: insurance.status === 'active' ? colors.success : colors.accent,
                  marginRight: 8,
                }} />
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {insurance.status === 'active' ? 'Actief' : 'Inactief'}
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={commonStyles.section}>
            <TouchableOpacity 
              style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}
              onPress={() => console.log('Contact broker')}
            >
              <View style={commonStyles.rowStart}>
                <Icon name="call-outline" size={24} color={colors.accent} style={commonStyles.icon} />
                <View>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    Contact makelaar
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    Vragen over deze verzekering
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}
              onPress={() => console.log('Download documents')}
            >
              <View style={commonStyles.rowStart}>
                <Icon name="document-text-outline" size={24} color={colors.accent} style={commonStyles.icon} />
                <View>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    Documenten downloaden
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    Polisvoorwaarden en certificaten
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {insurance.type === 'car' && (
              <TouchableOpacity 
                style={[commonStyles.emergencyButton, { marginTop: 16 }]}
                onPress={() => router.push('/accident-report')}
              >
                <Icon name="warning" size={32} color={colors.white} />
                <Text style={commonStyles.emergencyButtonText}>
                  Schade melden
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
