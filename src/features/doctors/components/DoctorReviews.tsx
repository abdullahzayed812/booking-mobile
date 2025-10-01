
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/doctorStyles';

interface Props {
  doctorId: string;
}

export const DoctorReviews: React.FC<Props> = ({ doctorId }) => {
  // TODO: Fetch reviews for the doctor
  const reviews: any[] = [];

  const renderReviewItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.patientName}</Text>
        <View style={styles.reviewRating}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={16}
              color="#f59e0b"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.sectionTitle}>Patient Reviews</Text>
      {reviews.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="star-off" size={48} color="#d1d5db" />
          <Text style={styles.emptyStateTitle}>No Reviews Yet</Text>
          <Text style={styles.emptyStateSubtitle}>Be the first to review this doctor!</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
