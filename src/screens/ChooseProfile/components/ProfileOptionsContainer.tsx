import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ProfileOptionsContainerProps, IoniconName } from '../types';
import ProfileOption from './ProfileOption';

/**
 * Componente que contém as opções de perfil lado a lado com layout aprimorado
 */
const ProfileOptionsContainer: React.FC<ProfileOptionsContainerProps> = ({
  containerOpacity,
  containerTranslateY,
  donateOptionOpacity,
  donateOptionScale,
  receiveOptionOpacity,
  receiveOptionScale,
  onSelectDonate,
  onSelectReceive,
}) => {
  // Explicitamente tipando os nomes dos ícones
  const heartIcon: IoniconName = 'heart-outline';
  const peopleIcon: IoniconName = 'people-outline';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: containerOpacity,
          transform: [{ translateY: containerTranslateY }],
        }
      ]}
    >
      <View style={styles.optionsRow}>
        <ProfileOption
          title="Quero Doar"
          description="Tenho alimentos e quero ajudar quem precisa."
          icon={heartIcon}
          optionOpacity={donateOptionOpacity}
          optionScale={donateOptionScale}
          onPress={onSelectDonate}
        />
        
        <ProfileOption
          title="Preciso de Ajuda"
          description="Preciso receber doações de alimentos."
          icon={peopleIcon}
          optionOpacity={receiveOptionOpacity}
          optionScale={receiveOptionScale}
          onPress={onSelectReceive}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: '100%',
    paddingHorizontal: 10,
    maxWidth: 500, // Limita a largura máxima em telas grandes
    columnGap: 6,
  }
});

export default ProfileOptionsContainer; 