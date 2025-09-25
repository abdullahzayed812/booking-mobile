export const getStatusColor = (status: string): string => {
  const colors = {
    scheduled: '#f59e0b',
    confirmed: '#10b981',
    in_progress: '#3b82f6',
    completed: '#6b7280',
    cancelled: '#ef4444',
    no_show: '#f87171',
  };
  return colors[status as keyof typeof colors] || '#6b7280';
};

export const getNoteTypeColor = (type: string): string => {
  const colors = {
    consultation: '#3b82f6',
    diagnosis: '#ef4444',
    treatment: '#10b981',
    prescription: '#f59e0b',
    follow_up: '#8b5cf6',
    lab_result: '#06b6d4',
  };
  return colors[type as keyof typeof colors] || '#6b7280';
};

export const getNoteTypeIcon = (type: string): string => {
  const icons = {
    consultation: 'account-voice',
    diagnosis: 'medical-bag',
    treatment: 'needle',
    prescription: 'pill',
    follow_up: 'calendar-clock',
    lab_result: 'test-tube',
  };
  return icons[type as keyof typeof icons] || 'note-text';
};
