import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';




const Tab = createBottomTabNavigator();

const Screence = () => {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        if (todoText.trim() === '') {
            return;
        }

        setTodos([...todos, { text: todoText, isEditing: false }]);
        setTodoText('');
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleStartEdit = (index) => {
        const newTodos = [...todos];
        newTodos[index].isEditing = true;
        setEditIndex(index);
        setEditedText(newTodos[index].text);
        setTodos(newTodos);
    };

    const handleSaveEdit = (index) => {
        const newTodos = [...todos];
        newTodos[index].text = editedText;
        newTodos[index].isEditing = false;
        setTodos(newTodos);
        setEditIndex(null);
    };

    const handleCancelEdit = (index) => {
        const newTodos = [...todos];
        newTodos[index].isEditing = false;
        setTodos(newTodos);
        setEditIndex(null);
    };

    const handleCompleteTodo = (index) => {
        const completedTodo = todos[index];
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setCompletedTodos([...completedTodos, completedTodo]);
    };

    const handleClearAll = () => {
        setTodos([]);
    };

    const handleClearCompletedAll = () => {
        setCompletedTodos([]);
    };

    const TodoItem = ({ todo, index }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#3d455a', margin: .5, fontSize: 25, color: '#fff', padding: 5 }}>
            {todo.isEditing ? (
                <>
                    <TextInput
                        style={{ flex: 1, fontSize: 22, color: '#fff' }}
                        value={editedText}
                        onChangeText={(text) => setEditedText(text)}
                    />
                    <TouchableOpacity onPress={() => handleSaveEdit(index)}>
                        <MaterialIcons name="done" size={24} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCancelEdit(index)}>
                        <MaterialIcons name="cancel" size={24} color="#e04400" />
                    </TouchableOpacity>
                </>
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, flexWrap: 'wrap' }}>
                    <Text style={{ color: '#fff', fontSize: 22, flex: 1 }}>{todo.text}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => handleCompleteTodo(index)}>
                            <MaterialIcons name="check-circle" size={24} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleStartEdit(index)}>
                            <MaterialIcons name="edit" size={24} color="#d8cf22" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
                            <MaterialIcons name="delete" size={24} color="#e04400" />
                        </TouchableOpacity>
                    </View>
                </View>

            )}
        </View>
    );

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: route.name,
                tabBarStyle: {
                    backgroundColor: '#3d455a',
                }
            })}
        >
            <Tab.Screen
                name="Active"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="check-circle" color={color} size={26} />
                    ),
                }}
                component={() => (
                    <View style={{ flex: 1, backgroundColor: '#282c37' }}>
                        <Text style={{
                            fontSize: 20, fontWeight: 'bold', backgroundColor: '#3d455a', textAlign: 'center', color: '#d8cf22',
                            padding: 10
                        }}>My ToDo List!</Text>
                        <Button title="Clear All" onPress={handleClearAll} />
                        <TextInput
                            placeholder="Type a todo, then hit enter!"
                            value={todoText}
                            onChangeText={(text) => setTodoText(text)}
                            onSubmitEditing={handleAddTodo}
                            style={{ color: '#fff', fontSize: 18, padding: 10, margin: 8, backgroundColor: '#5e7ab1' }}
                            placeholderTextColor={'#fff'}
                        />
                        <Button title="Add" onPress={handleAddTodo} />
                        <FlatList
                            data={todos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TodoItem todo={item} index={index} />
                            )}
                        />
                    </View>
                )}
            />
            <Tab.Screen
                name="Completed"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="done-all" color={color} size={26} />
                    ),
                }}
                component={() => (
                    <View style={{ flex: 1, backgroundColor: '#282c37' }}>
                        <Text style={{
                            fontSize: 20, fontWeight: 'bold', backgroundColor: '#3d455a', textAlign: 'center', color: '#d8cf22',
                            padding: 10
                        }}>
                            Completed Todos!
                        </Text>
                        <Button title="Clear All" onPress={handleClearCompletedAll} />
                        <FlatList
                            data={completedTodos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#50586e', margin: .5, fontSize: 25, color: '#fff', padding: 5 }}>
                                    <Text style={{ color: '#fff', fontSize: 22, flex: 1 }}>{item.text}</Text>
                                </View>
                            )}
                        />
                    </View>

                )}
            />
        </Tab.Navigator>

    );

};

export default Screence;