import React, { useEffect, useState } from 'react'
import { ScrollView, Clipboard, Text, TouchableOpacity, View, Image } from 'react-native';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
import { styles } from './TrendingNameScreen';
import Loader from './Loader';
const NamesByAlphabetsScreen = () => {
  const [newData, setNewData] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(false);
  const [onceDisplay, setOnceDisplay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [id, setID] = useState();
  const adUnitId = TestIds.INTERSTITIAL;
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
  const handleLoadMore = () => {
    setLoading2(true)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleID = (alphabet) => {
    setNewData([])
    setLoading(true)
    setID(alphabet)
  }
  const getData = async (id, currentPage) => {
    

    try {
      const response = await fetch(`https://islamic-names-backend.onrender.com/names/girls?id=${id}&page=${currentPage}`);
      const data = await response.json();
      setNewData([...newData, ...data.allNames]);
      setLoading(false);
      setLoading2(false)
      setTotalPages(data.totalPages);
      if (!onceDisplay) {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
          interstitial.show();
        });

        interstitial.load();
        setOnceDisplay(true)


      };
    } catch (error) {
      // console.log(error);
    }
  };


  useEffect(() => {
    getData(id, currentPage);
  }, [id, currentPage]);
  const handleCopy = (item) => {
    const copiedText = `Name: ${item.name}\nUrdu Name: ${item.urduName}\nEnglish Meaning: ${item.englishMeaning}\nUrdu Meaning: ${item.urduMeaning}`;
    Clipboard.setString(copiedText);
    setCopiedMessageVisible(true);
    setTimeout(() => {
      setCopiedMessageVisible(false);
    }, 1000);
  };
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>Select an Alphabet for Results</Text>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: 0, flexWrap: "wrap" }}>
          {alphabets.map((alphabet) => (
            <TouchableOpacity
              key={alphabet}
              style={{
                padding: 7,
                backgroundColor: "#800080",
                borderRadius: 5,
                margin: 5,
                alignItems: "flex-start", // Align items at the top
              }}
              onPress={() => handleID(alphabet)}
            >
              <Text style={{ color: "white" }}>{alphabet}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ overflow: "scroll" }}>
          {loading && (
            <View style={styles.loader}>
              <Text><Loader /></Text>
            </View>
          )}
          {!loading && <ScrollView style={styles.listContainerABC}>
            {newData.map((item, index) => (
              <View key={item.id} style={styles.listItem}>
                <View style={[styles.flex, styles.backgroundOne]}>
                  <Text style={styles.widthWhite}>{item.name}  <TouchableOpacity onPress={() => handleCopy(item)}>
                    <Image
                      style={styles.copy}
                      source={require('../Assets/copy.png')}
                      alt="img"
                    />
                  </TouchableOpacity></Text>
                  <Text style={styles.widthWhite}>{item.urduName}</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.width}>{item.englishMeaning}</Text>
                  <Text style={styles.width}>{item.urduMeaning}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity>
              {loading2 && <Text style={styles.loadMore}>Loading...</Text>}
              {!id && <Text style={styles.welcome}>
                WELCOME
              </Text>}
              {!loading2 && id && <Text style={styles.loadMore}>
                LOAD MORE
              </Text>}
            </TouchableOpacity>
          </ScrollView>}
          {copiedMessageVisible && (
            <Text style={styles.copiedMessage}>Text copied to clipboard</Text>
          )}
        </View>
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




export default NamesByAlphabetsScreen