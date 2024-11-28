import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet} from 'react-native';

const App = () => {
  // Sample data
  const data = [


    {id: 1, name: 'John Doe', country: 'USA'},
    {id: 2, name: 'Jane Smith', country: 'Canada'},
    {id: 3, name: 'Alice Johnson', country: 'USA'},
  ];

  // States for query and filtered data
  const [query, setQuery] = useState(''); // For user input
  const [filteredData, setFilteredData] = useState(data); // For displaying results

  // Function to handle searching
  const handleSearch = value => {
    setQuery(value); // Update the query state
    const filtered = data.filter(item =>
      Object.values(item).some(field =>
        field.toString().toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setFilteredData(filtered); // Update filtered data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Data</Text>

      {/* Search Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Search by ID, Name, or Country"
        value={query}
        onChangeText={handleSearch}
      />

      {/* Results List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.id}. {item.name} - {item.country}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No matching results found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    backgroundColor: '#e6e6fa',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default App;
