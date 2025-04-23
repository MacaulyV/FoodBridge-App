import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, Animated, 
  Platform, Modal, StyleSheet, ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { DatePickerFieldProps } from '../types';
import styles from '../styles';

// Componente simplificado que não usa API nativa
const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  touched,
  onBlur,
  opacity,
  translateY,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [wasTouched, setWasTouched] = useState(!!touched);
  
  // Obter a data atual ao montar o componente
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite para comparação justa
  
  // Determinar se temos um erro para mostrar
  const showError = error && wasTouched;
  
  // Efeito para atualizar o estado wasTouched quando o prop touched muda
  useEffect(() => {
    if (touched) {
      setWasTouched(true);
    }
  }, [touched]);
  
  // Formatação da data
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  // Variáveis para o ano, mês e dia atual
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // Verificar se a data é válida (atual ou futura)
  const isValidDate = (date: Date): boolean => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite
    return dateToCheck >= today;
  };
  
  // Gerar anos para o picker (atual + 5 anos para frente)
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);
  
  // Gerar meses para o picker
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Gerar dias para o picker
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getSelectedYear = () => selectedDate?.getFullYear() || currentYear;
  const getSelectedMonth = () => selectedDate?.getMonth() || currentMonth;
  const getSelectedDay = () => selectedDate?.getDate() || currentDay;
  
  // Função para selecionar uma data
  const handleSelectDate = (year: number, month: number, day: number) => {
    // Verificar se a data selecionada é hoje ou no futuro
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };
  
  // Abrir o modal do seletor de data
  const handleOpenPicker = () => {
    // Se não houver data selecionada, pré-selecionar a data atual
    if (!selectedDate) {
      setSelectedDate(today);
    }
    setShowPicker(true);
  };
  
  // Função para confirmar a seleção
  const handleConfirm = () => {
    setWasTouched(true);
    
    if (selectedDate) {
      // Verificar se a data selecionada é válida (hoje ou futura)
      if (isValidDate(selectedDate)) {
        onChange(selectedDate);
      } else {
        // Se a data for inválida, selecionar a data atual
        onChange(today);
        setSelectedDate(today);
      }
    } else {
      // Se não houver data selecionada, usar a data atual
      onChange(today);
      setSelectedDate(today);
    }
    
    setShowPicker(false);
    if (onBlur) onBlur();
  };
  
  // Função para cancelar a seleção
  const handleCancel = () => {
    setSelectedDate(value);
    setShowPicker(false);
  };
  
  return (
    <Animated.View 
      style={[
        styles.inputContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={handleOpenPicker}
        style={styles.dateContainer}
      >
        <Text 
          style={value ? styles.dateText : styles.datePlaceholder}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Icon name="calendar" size={18} color="#FFFFFF" />
      </TouchableOpacity>
      
      {value && (
        <Text style={[
          styles.dateSelectedValue,
          !isValidDate(value) && { color: '#ff4d4f' }
        ]}>
          Validade selecionada: {formatDate(value)}
          {!isValidDate(value) && " (Data inválida, selecione data atual ou futura)"}
        </Text>
      )}
      
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={pickerStyles.modalContainer}>
          <View style={pickerStyles.pickerContainer}>
            <Text style={pickerStyles.title}>Selecione uma data</Text>
            
            <View style={pickerStyles.pickerContent}>
              {/* Seletor de Ano */}
              <View style={pickerStyles.pickerColumn}>
                <Text style={pickerStyles.pickerLabel}>Ano</Text>
                <ScrollView style={pickerStyles.scrollView}>
                  {years.map(year => (
                    <TouchableOpacity
                      key={`year-${year}`}
                      style={[
                        pickerStyles.pickerItem,
                        getSelectedYear() === year && pickerStyles.selectedItem
                      ]}
                      onPress={() => handleSelectDate(
                        year, 
                        getSelectedMonth(), 
                        getSelectedDay()
                      )}
                    >
                      <Text 
                        style={[
                          pickerStyles.pickerItemText,
                          getSelectedYear() === year && pickerStyles.selectedItemText
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Seletor de Mês */}
              <View style={pickerStyles.pickerColumn}>
                <Text style={pickerStyles.pickerLabel}>Mês</Text>
                <ScrollView style={pickerStyles.scrollView}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={`month-${index}`}
                      style={[
                        pickerStyles.pickerItem,
                        getSelectedMonth() === index && pickerStyles.selectedItem
                      ]}
                      onPress={() => handleSelectDate(
                        getSelectedYear(), 
                        index, 
                        Math.min(
                          getSelectedDay(), 
                          getDaysInMonth(getSelectedYear(), index)
                        )
                      )}
                    >
                      <Text 
                        style={[
                          pickerStyles.pickerItemText,
                          getSelectedMonth() === index && pickerStyles.selectedItemText
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Seletor de Dia */}
              <View style={pickerStyles.pickerColumn}>
                <Text style={pickerStyles.pickerLabel}>Dia</Text>
                <ScrollView style={pickerStyles.scrollView}>
                  {Array.from(
                    { length: getDaysInMonth(getSelectedYear(), getSelectedMonth()) }, 
                    (_, i) => i + 1
                  ).map(day => (
                    <TouchableOpacity
                      key={`day-${day}`}
                      style={[
                        pickerStyles.pickerItem,
                        getSelectedDay() === day && pickerStyles.selectedItem
                      ]}
                      onPress={() => handleSelectDate(
                        getSelectedYear(), 
                        getSelectedMonth(), 
                        day
                      )}
                    >
                      <Text 
                        style={[
                          pickerStyles.pickerItemText,
                          getSelectedDay() === day && pickerStyles.selectedItemText
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            
            <View style={pickerStyles.buttonContainer}>
              <TouchableOpacity
                style={[pickerStyles.button, pickerStyles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={pickerStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[pickerStyles.button, pickerStyles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={pickerStyles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const pickerStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  pickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#CCCCCC',
    marginBottom: 10,
  },
  scrollView: {
    height: 150,
    width: '100%',
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: 'rgba(50, 205, 50, 0.3)',
  },
  pickerItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: '#32CD32',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  confirmButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DatePickerField; 