import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorDetail = ({ route }) => {
  const { doctor } = route.params;
  const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM'];
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBooking = async () => {
    if (!selectedTime) {
      ToastAndroid.show('Please select a time slot', ToastAndroid.SHORT);
      return;
    }

    const appointment = {
      doctorName: doctor.name,
      specialization: doctor.specialization,
      time: selectedTime,
    };

    await AsyncStorage.setItem('appointment', JSON.stringify(appointment));
    ToastAndroid.show('Appointment booked successfully!', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialization}>{doctor.specialization}</Text>
      <Text style={styles.location}>{doctor.location}</Text>

      <Text style={styles.subheading}>Choose a Time Slot:</Text>
      <View style={styles.slotContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.slot,
              selectedTime === slot && styles.selectedSlot,
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text style={styles.slotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  specialization: { fontSize: 18, color: '#555', marginVertical: 4 },
  location: { fontSize: 14, color: '#777' },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  slot: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedSlot: {
    backgroundColor: '#d1f0d4',
    borderColor: '#28a745',
  },
  slotText: {
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
