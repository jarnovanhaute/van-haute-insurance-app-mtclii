
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Insurance } from '../types/Insurance';
import { commonStyles, colors } from '../styles/commonStyles';
import { formatCurrency, formatDate } from '../utils/timeUtils';
import Icon from './Icon';

interface InsuranceCardProps {
  insurance: Insurance;
  onPress: () => void;
}

const getInsuranceIcon = (type: Insurance['type']) => {
  switch (type) {
    case 'car':
      return 'car-outline';
    case 'home':
      return 'home-outline';
    case 'health':
      return 'medical-outline';
    case 'life':
      return 'heart-outline';
    case 'travel':
      return 'airplane-outline';
    default:
      return 'document-outline';
  }
};

const getInsuranceTypeLabel = (type: Insurance['type']) => {
  switch (type) {
    case 'car':
      return 'Autoverzekering';
    case 'home':
      return 'Woonverzekering';
    case 'health':
      return 'Gezondheidsverzekering';
    case 'life':
      return 'Levensverzekering';
    case 'travel':
      return 'Reisverzekering';
    default:
      return 'Verzekering';
  }
};

export default function InsuranceCard({ insurance, onPress }: InsuranceCardProps) {
  const isExpiringSoon = new Date(insurance.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  return (
    <TouchableOpacity style={commonStyles.insuranceCard} onPress={onPress}>
      <View style={commonStyles.row}>
        <View style={commonStyles.rowStart}>
          <Icon 
            name={getInsuranceIcon(insurance.type)} 
            size={24} 
            color={colors.accent}
            style={commonStyles.icon}
          />
          <View>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {getInsuranceTypeLabel(insurance.type)}
            </Text>
            <Text style={commonStyles.textSecondary}>
              {insurance.policyNumber}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
            {formatCurrency(insurance.premium)}
          </Text>
          <Text style={[
            commonStyles.textSecondary,
            isExpiringSoon && { color: colors.accent, fontWeight: '600' }
          ]}>
            Tot {formatDate(insurance.expiryDate)}
          </Text>
        </View>
      </View>
      
      <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
        {insurance.description}
      </Text>
      
      {insurance.status === 'active' && (
        <View style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.success,
        }} />
      )}
    </TouchableOpacity>
  );
}
