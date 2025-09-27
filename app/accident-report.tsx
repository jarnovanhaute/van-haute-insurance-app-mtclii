
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function AccidentReportScreen() {
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [accidentType, setAccidentType] = useState<'car' | 'home' | 'other'>('car');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const submitReport = () => {
    if (!description.trim()) {
      Alert.alert('Fout', 'Gelieve een beschrijving in te vullen.');
      return;
    }

    console.log('Submitting accident report:', {
      type: accidentType,
      description,
      photos: photos.length,
    });

    Alert.alert(
      'Schademelding verzonden',
      'Uw schademelding is succesvol verzonden. Wij nemen zo spoedig mogelijk contact met u op.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
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
            Schade melden
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Accident Type Selection */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Type schade</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {[
                { key: 'car', label: 'Auto', icon: 'car-outline' },
                { key: 'home', label: 'Woning', icon: 'home-outline' },
                { key: 'other', label: 'Andere', icon: 'help-circle-outline' },
              ].map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    {
                      flex: 1,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 2,
                      alignItems: 'center',
                    },
                    accidentType === type.key
                      ? { borderColor: colors.accent, backgroundColor: colors.backgroundAlt }
                      : { borderColor: colors.border, backgroundColor: colors.white }
                  ]}
                  onPress={() => setAccidentType(type.key as any)}
                >
                  <Icon 
                    name={type.icon as any} 
                    size={24} 
                    color={accidentType === type.key ? colors.accent : colors.textSecondary} 
                  />
                  <Text style={[
                    commonStyles.textSecondary,
                    { marginTop: 8, fontWeight: '600' },
                    accidentType === type.key && { color: colors.accent }
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Beschrijving van de schade</Text>
            <TextInput
              style={[
                commonStyles.card,
                {
                  height: 120,
                  textAlignVertical: 'top',
                  fontSize: 16,
                  color: colors.text,
                }
              ]}
              placeholder="Beschrijf wat er gebeurd is, waar en wanneer..."
              placeholderTextColor={colors.textSecondary}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Photos */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Foto&apos;s ({photos.length})</Text>
            
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <TouchableOpacity
                style={[buttonStyles.outline, { flex: 1 }]}
                onPress={takePhoto}
              >
                <Icon name="camera-outline" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginTop: 4, color: colors.primary }]}>
                  Foto maken
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[buttonStyles.outline, { flex: 1 }]}
                onPress={pickImage}
              >
                <Icon name="image-outline" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginTop: 4, color: colors.primary }]}>
                  Galerij
                </Text>
              </TouchableOpacity>
            </View>

            {photos.length > 0 && (
              <View style={commonStyles.card}>
                <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
                  {photos.length} foto&apos;s toegevoegd
                </Text>
                {photos.map((photo, index) => (
                  <View key={index} style={[commonStyles.rowStart, { marginBottom: 4 }]}>
                    <Icon name="image" size={16} color={colors.accent} style={{ marginRight: 8 }} />
                    <Text style={commonStyles.textSecondary}>
                      Foto {index + 1}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Emergency Info */}
          <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt, marginBottom: 32 }]}>
            <View style={commonStyles.rowStart}>
              <Icon name="information-circle-outline" size={24} color={colors.accent} style={commonStyles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  Belangrijk
                </Text>
                <Text style={commonStyles.textSecondary}>
                  Bij ernstige ongevallen, bel eerst 112. Deze melding vervangt geen aangifte bij de politie.
                </Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={submitReport}
          >
            <Text style={[commonStyles.text, { color: colors.white, fontWeight: '600' }]}>
              Schademelding verzenden
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
