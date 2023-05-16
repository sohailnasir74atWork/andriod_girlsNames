import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import Loader from './Loader';
import { Clipboard } from 'react-native';
import {  InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
const TrendingNamesScreen = () => {
  const [trendingBoys, setTrendingBoys] = useState([]);
  const [quranicBoys, setQuranicBoys] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [totalPagesTrendingBoys, setTotalPagesTrendingBoys] = useState(0);
  const [totalPagesQuranicBoys, setTotalPagesQuranicBoys] = useState(0);
  const [currentTrendingBoys, setCurrentTrendingBoys] = useState(1);
  const [onceDisplay, setOnceDisplay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentQuranicBoys, setCurrentQuranicBoys] = useState(1);
  const [activeBtnIndex, setActiveButtonIndex] = useState(0);
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false)
  const adUnitId = TestIds.INTERSTITIAL;
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
  });
  const handleChangeButton = (e)=>{
    setActiveButtonIndex(e)

    if(!onceDisplay){ const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitial.show();
  });
  interstitial.load();
  setOnceDisplay(true)
}
  }
  const handleLoadMore = () => {
    setLoading2(true)

    if (activeBtnIndex === 0 && currentTrendingBoys < totalPagesTrendingBoys) {

      setCurrentTrendingBoys(currentTrendingBoys + 1);
    } else if (activeBtnIndex === 1 && currentQuranicBoys < totalPagesQuranicBoys) {
      setCurrentQuranicBoys(currentQuranicBoys + 1);
      
    }
  };
  const getTrendingBoys = async () => {
    try {
      const response = await fetch(`https://islamic-names-backend.onrender.com/names/trending/girls?page=${currentTrendingBoys}`);
      const data = await response.json();
      setTrendingBoys([...trendingBoys, ...data.allNames]);
      setTotalPagesTrendingBoys(data.totalPages);
      setLoading(false);
      setLoading2(false);

    } catch (error) {
      // console.log(error);
    }
  }
  const getQuranicBoys = async () => {
    try {
      const response = await fetch(`https://islamic-names-backend.onrender.com/names/quranic/girls?page=${currentQuranicBoys}`);
      const data = await response.json();
      setQuranicBoys([...quranicBoys, ...data.allNames]);
      setTotalPagesQuranicBoys(data.totalPages);
      setLoading(false);
      setLoading2(false);
    } catch (error) {
      // console.log(error);
    }
  }
  const getData = async () => {
    try {
      await Promise.all([getTrendingBoys(), getQuranicBoys()]);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  }
  const handleCopy = (item) => {
    const copiedText = `Name: ${item.name}\nUrdu Name: ${item.urduName}\nEnglish Meaning: ${item.englishMeaning}\nUrdu Meaning: ${item.urduMeaning}`;
    Clipboard.setString(copiedText);
    setCopiedMessageVisible(true);
        // Hide the message after 1 second
        setTimeout(() => {
            setCopiedMessageVisible(false);
        }, 1000);
  };
  useEffect(() => {
    getTrendingBoys();
  }, [currentTrendingBoys]);
  useEffect(() => {
    getQuranicBoys();
  }, [currentQuranicBoys]);
  useEffect(() => {
    getData();
  }, [activeBtnIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleChangeButton(0)}>
          <Text style={activeBtnIndex === 0 ? styles.textActive : styles.text}>
            TRENDING NAMES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeButton(1)}>
          <Text style={activeBtnIndex === 1 ? styles.textActive : styles.text}>
            QURANIC NAMES
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ overflow: "scroll" }}>
        {loading && (
          <View style={styles.loader}>
            <Text><Loader/></Text>
          </View>
        )}
        {!loading && <ScrollView style={styles.listContainer}>
          {activeBtnIndex === 0 ? trendingBoys.map((item, index) => (
            <View key={item.id} style={styles.listItem}>
              <View style={[styles.flex, styles.backgroundOne]}>
                <Text style={styles.widthWhite}>
                <Text >{item.name}</Text>
                <TouchableOpacity onPress={() => handleCopy(item)}>
                <Image
                  style={styles.copy}
                  source={require('../Assets/copy.png')}
                  alt="img"
                />
              </TouchableOpacity>
            
                </Text>
                <Text style={styles.widthWhite}>{item.urduName}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.width}>{item.englishMeaning}</Text>
                <Text style={styles.width}>{item.urduMeaning}</Text>
              </View>
            </View>
          )) : quranicBoys.map((item, index) => (
            <View key={item.id} style={styles.listItem}>
              <View style={[styles.flex, styles.backgroundOne]}>
                <Text style={styles.widthWhite}>{item.name}
                <TouchableOpacity onPress={() => handleCopy(item)}>
                <Image
                  style={styles.copy}
                  source={require('../Assets/copy.png')}
                  alt="img"
                />
              </TouchableOpacity>
              </Text>
                
                <Text style={styles.widthWhite}>{item.urduName}</Text>
              </View>
              <View style={styles.flex}>
              <Text style={styles.width}>{item.englishMeaning}</Text>
                <Text style={styles.width}>{item.urduMeaning}</Text>
            </View>
            </View>
          ))}

          <TouchableOpacity onPress={handleLoadMore}>
            {loading2 && <Text style={styles.loadMore}>Loading...</Text>}
            {!loading2 && <Text style={styles.loadMore}>
              LOAD MORE
            </Text>}
          </TouchableOpacity>
                </ScrollView>}
                {copiedMessageVisible && (
                <Text style={styles.copiedMessage}>Text copied to clipboard</Text>
            )}
      </View>
      <View style={styles.banneradd}>
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.BANNER}
                />
            </View>
    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    padding: 16,
    height:"100%"
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    paddingVertical: 10,
    color: "white",
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
  },
  textActive: {
    paddingVertical: 10,
    color: "white",
    backgroundColor: "#800080",
    borderRadius: 5,
    padding: 10,

  },
  listContainer: {
    marginTop: 10,
    overflow: "scroll",
    maxHeight: "91.5%",
  },
  listContainerABC: {
    marginTop: 10,
    overflow: "scroll",
    maxHeight: "79.5%",
  },
  listContainerSearch: {
    marginTop: 10,
    overflow: "scroll",
    maxHeight: "74%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backgroundOne: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
    color: "white",
    backgroundColor: "#800080",

  },
  width: {
    width: "47%",
    padding: 5,
    color:"black"
  },
  widthWhite: {
    width: "47%",
    color: "white",
    padding: 5,
  },
  loader: {
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadMore: {
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    backgroundColor: "#800080",
    borderRadius: 5,
    textAlign: "center",
    width: "60%",
  },
  welcome: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    backgroundColor: "#800080",
    borderRadius: 5,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 8,
    color:"black"
},
btn:{
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    backgroundColor: "#800080",
    borderRadius: 5,
    textAlign: "center",
  },
  firsttext: {
    justifyContent: "center",
    textAlign: "center",
    fontSize:16,
    fontWeight:"bold"
  },
  copy: {
    width: 17,
    height: 17,
    marginLeft: 10,
    top:-14,
    position:"absolute"
  },
  banneradd:{
    position: 'absolute',
    bottom: 0,
    
    alignSelf: 'center',
  },
  copiedMessage: {
    backgroundColor: 'darkgreen',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    left: 40,
    right: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    },
    });
export default TrendingNamesScreen