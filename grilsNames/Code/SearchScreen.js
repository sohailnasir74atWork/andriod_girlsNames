import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Clipboard, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Loader from './Loader';
import { styles } from './TrendingNameScreen';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [onceDisplay, setOnceDisplay] = useState(false);
    const [nodata, setNodata] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false);
    const [copiedMessageVisible, setCopiedMessageVisible] = useState(false)
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const adUnitId = TestIds.INTERSTITIAL;
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });
    const handleButton = async () => {
        if (searchQuery.length < 2) {
            setNodata(true);

            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://islamic-names-backend.onrender.com/names/search/girls?search=${searchQuery}`
            );
            const data = await response.json();
            if (data.length < 1) {
                setNodata(true);
            }
            if (data.length > 0) {
                setNodata(false);
            }
            setSearchResults(data);
            setLoading(false);
        } catch (error) {
            // console.error(error);
            // alert('Failed to search for names.');
        }
        setLoading(false);
        if (!onceDisplay) {
            const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setLoaded(true);
                interstitial.show();
            });
            interstitial.load();
            setOnceDisplay(true)
        };
    }
    const handleCopy = (item) => {
        const copiedText = `Name: ${item.name}\nUrdu Name: ${item.urduName}\nEnglish Meaning: ${item.englishMeaning}\nUrdu Meaning: ${item.urduMeaning}`;
        Clipboard.setString(copiedText);
        // Show the message
        setCopiedMessageVisible(true);
        // Hide the message after 1 second
        setTimeout(() => {
            setCopiedMessageVisible(false);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    placeholder="Enter text here"
                    onSubmitEditing={handleButton}
                />
            </View>
            <View>
                <TouchableOpacity onPress={
                    handleButton
                }>
                    <Text style={styles.btn}>
                        SEARCH NAME
                    </Text>
                </TouchableOpacity>
            </View>
            {loading && <View style={styles.loader}>

                <Text><Loader /></Text>
                <Text style={styles.firsttext}>The first-time search might require a bit more time, so please be patient</Text></View>
            }
            {!loading && nodata && <Text style={styles.firsttext}>Not Found. <Text style={{color:"red"}}>Are you sure this is a Girl Name?</Text> </Text>}
            {!loading && <ScrollView style={styles.listContainerSearch}>
                {searchResults.map((item, index) => (
                    <View key={item.id} style={styles.listItem}>
                        <View style={[styles.flex, styles.backgroundOne]}>
                            <Text style={styles.widthWhite}>{item.name}  <TouchableOpacity onPress={() => handleCopy(item)}>
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
            </ScrollView>}
            {copiedMessageVisible && (
                <Text style={styles.copiedMessage}>Text copied to clipboard</Text>
            )}
            <View style={styles.banneradd}>
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.BANNER}
                />
            </View>
        </View>
    )
}
export default SearchScreen