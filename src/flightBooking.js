import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState, createContext} from 'react';
import axios from 'axios';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import {PaperProvider} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import moment from 'moment';

const ITEM_HEIGHT = 120;
let fullData = [];

const FlightBooking = () => {
  const [user, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const bottomsortref = useRef();
  const bottomfilterref = useRef();

  const [selected, setSelected] = React.useState('');
  const data = [
    {key: '1', value: 'JetSpice', },
    {key: '2', value: 'Air India'},
  ];
  const [selectedValue, setSelectedValue] = useState('option3');
  const ref = useRef(null);
  useEffect(() => {
    getFlights();

  }, []);

  const renderItem = ({item}) => {
    const data = item?.displayData;
    const airline = data?.airlines[0]
    const png =
      airline?.airlineCode == 'CD' &&
      airline?.flightNumber == '4567'
        ? require('../flight3.png')
        : require('../flight2.png');
    return (
      <View style={[styles?.itemWrapperStyle, {height: ITEM_HEIGHT}]}>
        <Image style={styles?.image} source={png} />
        {/* <View style={styles?.contentWrapperStyle}>
          <Text
            style={
              styles?.txtNameStykes
            }>{`${data?.source?.airport?.cityName} - ${data?.destination?.airport?.cityName}`}</Text>
          <Text
            numberOfLines={1}
            style={
              styles?.txtNameStykes
            }>{`Rs ${item?.fare?.toLocaleString()}`}</Text>
        </View> */}
        <TouchableOpacity key={data.id} style={{ flex:1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{airline.airlineName}</Text>
              <Text style={{ fontSize: 14 }}>Flight #{airline.flightNumber}</Text>
              <Text style={{ fontSize: 14 }}>
                {data?.source?.airport?.cityName} ({data?.source?.airport?.cityCode}) - {data?.destination?.airport?.cityName} ({data?.destination?.airport?.cityCode}) 
                
              </Text>
              <Text style={{ fontSize: 14 }}>
                {moment(data?.source?.depTime).format('LT')} -  {moment(data?.destination?.arrTime).format('LT') + " "+data?.totalDuration}
              </Text>
              <Text style={{ fontSize: 14 }}>
                Duration: <Text style={{ fontSize: 14, fontWeight: '600' }}>{data?.totalDuration}</Text>
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>₹ {item?.fare?.toLocaleString()}</Text>
              <Text style={{ fontSize: 14 }}>Book Now</Text>
            </View>
          </View>
          {/* <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 8 }} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  const getFlights = async() => {
    setLoading(true);
    fullData = []
    await axios.get(`https://api.npoint.io/4829d4ab0e96bfab50e7`).then(res => {
      setUsers(res?.data?.data?.result);
      fullData = res?.data?.data?.result
      setLoading(false);
    });
  };

  const SortBy = () => {
    return (
      <View style={styles.sortByContainer}>
        <View style={styles.sortByTopContainer}>
          <Text style={styles.sortByText}>Sort by:</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="option1"
                status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSelectedValue('option1');
                  const sortData = user.sort((a, b) => a.fare - b.fare);
                  setUsers(sortData);
                  bottomsortref.current.close();
                }}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Price: Low to High</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="option2"
                status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSelectedValue('option2');
                  const sortData = user.sort((a, b) => b.fare - a.fare);
                  setUsers(sortData);
                  bottomsortref.current.close();
                }}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Price: High to Low</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="option3"
                status={selectedValue === 'option3' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSelectedValue('option3');
                  setUsers([]);
                  getFlights();
                  bottomsortref.current.close();
                }}
                color="#007BFF"
              />
              <Text style={styles.radioLabel}>Default</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const filterAirline = async()=> {

    let filteredAirline = fullData.filter((data) => selected.length>0?selected.includes(data?.displayData?.airlines[0]?.airlineName):true);    
    setUsers(filteredAirline);
  }

  return (
    // <PaperProvider>
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          title="Sort"
          onPress={() => {
            // ref?.current?.scrollToIndex({
            //   index: 0,
            // });
            bottomsortref.current.show();
          }}
        />
        <Button
          title="Filter"
          onPress={() => {
            // ref?.current?.scrollToEnd();
            bottomfilterref.current.show();
          }}
        />
      </View>
      <FlatList
        ref={ref}
        data={user}
        initialNumToRender={100}
        maxToRenderPerBatch={100}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        getItemLayout={(data, index) => {
          return {index, length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index};
        }}
        onEndReachedThreshold={0}
      />

      {/* sort */}
      <BottomSheet hasDraggableIcon ref={bottomsortref} height={300}>
        <SortBy />
      </BottomSheet>

      {/* fliter */}
      <BottomSheet hasDraggableIcon ref={bottomfilterref} height={500}>
        <View style={{margin: 20}}>
          <MultipleSelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            onSelect={() => filterAirline()}
            label="Airlines"
            selectedItems={selected}
            style={{margin: 10}}
            // defaultOption={{key: '1', value: 'JetSpice'}}
          />
        </View>
        {selected?.length>0 && selected?.map((i)=>{return (<Text>{i}</Text>)})}
      </BottomSheet>
    </SafeAreaView>
    // </PaperProvider>
  );
};
const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 70,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    fontSize: 16,
  },
  txtNameStykes: {
    justifyContent: 'space-around',
  },
  txtEmailStykes: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  sortByContainer: {
    flex: 1,
    // justifyContent:'space-between',
    // flexDirection:'row',
  },
  sortByTopContainer: {
    // flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
  },
  sortByText: {
    fontSize: 18,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    fontWeight: '500',

    // flex:1
  },
  sortByBtn: {
    fontSize: 18,
    flex: 1,
    justifyContent: 'flex-end',
    margin: 15,
    alignSelf: 'center',
  },
  sortByPicker: {},
  //sort
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    // flex:1,
    justifyContent: 'space-around',
    // marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default FlightBooking;