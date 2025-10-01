import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DashboardStackParamList } from '../navigation/DashboardNavigator';
import { MainDrawerParamList } from '../navigation/MainNavigator';

interface Props
  extends CompositeScreenProps<
    StackScreenProps<DashboardStackParamList, 'Activity'>,
    DrawerScreenProps<MainDrawerParamList, 'Activity'>
  > {}

export const ActivityScreen: React.FC<Props> = ({}) => {
  const activities = [
    {
      id: '1',
      type: 'appointment_completed',
      description: 'Consultation with Dr. Smith completed.',
      timestamp: '2023-10-26T10:00:00Z',
    },
    {
      id: '2',
      type: 'medical_note_created',
      description: 'New medical note added for Patient Jane Doe.',
      timestamp: '2023-10-25T15:30:00Z',
    },
    {
      id: '3',
      type: 'patient_registered',
      description: 'New patient John Doe registered.',
      timestamp: '2023-10-24T09:00:00Z',
    },
  ];

  const renderActivityItem = ({ item }: { item: any }) => (
    <View
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
    >
      <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
      <Text style={{ color: '#666' }}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 16 }}>
        Recent Activity
      </Text>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={renderActivityItem}
      />
    </View>
  );
};
