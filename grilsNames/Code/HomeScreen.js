import React from 'react';
import { View, Text, TouchableOpacity, Linking, Share, StyleSheet } from 'react-native';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

function HomeScreen({ navigation }) {
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out my awesome app: https://play.google.com/store/apps/details?id=com.grilsnames&referrer=utm_source%3Dshare',
      });
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "90%" }}>
      <TouchableOpacity
          onPress={() => navigation.navigate('SEARCH BY ALPHABETS')}
          style={styles.button}>
          <View style={styles.buttonCont}>
            <Text style={styles.text}>SEARCH BY ALPHABETS</Text>
            <Text style={styles.text}>حروفِ تہجی کے لحاظ سے</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('TRENDING NAMES')}
          style={styles.button}>
          <View style={styles.buttonCont}>
            <Text style={styles.text}>TRENDING NAMES</Text>
            <Text style={styles.text}>مقبول نام</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SEARCH NAME')}
          style={styles.button}>
          <View style={styles.buttonCont}>
            <Text style={styles.text}>SEARCH NAME</Text>
            <Text style={styles.text}>نام تلاش کریں</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.grilsnames')}
          style={styles.button}>
          <View style={styles.buttonContLast}>
            <Text style={styles.text}>RATE US ⭐⭐⭐⭐⭐</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareApp} style={styles.button}>
          <View style={styles.buttonContLast}>
            <Text style={styles.text}>SHARE WITH FRIENDS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.banneradd}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.BANNER}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonContLast: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#800080',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center",
  },
});

export default HomeScreen;
