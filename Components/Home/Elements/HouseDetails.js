import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE, COMMENT, POST_COMMENT } from "../../../constants/api";
import { UserContext } from "../../../context/userContext";
import { ScreenContext } from "../../../context/screenContext";
import COLORS from "../Constants";

const HouseDetails = ({ navigation }) => {
    const route = useRoute();
    const posts = route.params?.posts;
    const flatListRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const options = [
        { label: 'Share via Facebook', value: 'facebook' },
        { label: 'Share via Text Message', value: 'sms' },
        { label: 'Cancel', value: 'cancel' },
      ];
    const [activeIndex, setActiveIndex] = useState(0);
    const handlePhoneCall = () => {
        Linking.openURL('tel:+0334436231');
    };
     const handleShareSocial = async () => {
        try {
            const result = await Sharing.shareAsync('Nội dung bạn muốn chia sẻ');
            if (result.action === Sharing.sharedAction) {
                showMessage({
                    message: 'Chia sẻ thành công!',
                    type: 'success',
                });
            } else if (result.action === Sharing.dismissedAction) {
                showMessage({
                    message: 'Hủy chia sẻ',
                    type: 'warning',
                });
            }
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error.message);
            showMessage({
                message: 'Lỗi khi chia sẻ',
                type: 'danger',
            });
        }
    };
    const handleChatMessage = () => {
        Linking.openURL('sms:+0334436231');
      };
      useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === (carouselData.length - 1)) {
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                })
                setActiveIndex(0);
            } else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                })
                setActiveIndex(prevIndex => prevIndex + 1);
            }
        }, 3000);
        
        return () => clearInterval(interval);
    }, [activeIndex]); // Thêm carouselData.length vào dependencies
    
    

    //======================== SHOW COMMENT =====================
    const [comments, setComments] = useState([]);
    const { userInfo, isAuthenticated } = useContext(UserContext);
    const { wishList, setMyWishList } = useContext(ScreenContext);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                if (isAuthenticated()) {
                    const response = await axios.get(`${API_BASE}${COMMENT(posts.id)}`, {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    });
                    // console.log(response.data);
                    setComments(response.data);
                } else {
                    console.log('Người dùng chưa được xác thực');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        fetchComments(); 
    
    }, []);

    //======================= POST COMMENT ===================
    const [commentContent, setCommentContent] = useState('');

    const handleSendComment = async () => {
        try {
            if (isAuthenticated()) {
                const response = await axios.post(`${API_BASE}${POST_COMMENT(posts.id)}`, {
                        content: commentContent,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    }
                );
                // console.log("Nội dung bình luận:", response.data);
                const newComment = response.data;
                setComments([newComment, ...comments]);
                setCommentContent('');
            } else {
                console.log('Người dùng chưa được xác thực');
            }
        } catch (error) {
            console.error('Lỗi khi thực hiện bình luận', error);
        }
    };
    
    // ==================== SỬA VÀ XÓA BÌNH LUẬN ===================
    
    const [showOptions, setShowOptions] = useState(false);

    const handleDelete = () => {
        onDelete(comment.id); // Gọi hàm xóa bình luận
        setShowOptions(false); // Ẩn menu modal sau khi thực hiện xóa
    };

    const handleUpdate = () => {
        onUpdate(comment.id, comment.content); // Gọi hàm cập nhật bình luận và truyền nội dung hiện tại của bình luận
        setShowOptions(false); // Ẩn menu modal sau khi thực hiện cập nhật
    };
    
    // const handleUpdateComment = async (index) => {
    //     try {
    //         const updatedComment = { ...comments[index], content: 'Nội dung bình luận mới' }; // Thay đổi nội dung bình luận theo yêu cầu của bạn
    //         const response = await axios.put(`${API_BASE}/comments/${updatedComment.id}`, updatedComment, {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.access}`,
    //             },
    //         });
    //         // Cập nhật bình luận trong danh sách
    //         setComments((prevComments) => {
    //             const updatedComments = [...prevComments];
    //             updatedComments[index] = response.data;
    //             return updatedComments;
    //         });
    //     } catch (error) {
    //         console.error('Lỗi khi cập nhật bình luận:', error);
    //     }
    // };

    // const handleDeleteComment = async (index) => {
    //     try {
    //         const commentId = comments[index].id;
    //         await axios.delete(`${API_BASE}/comments/${commentId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.access}`,
    //             },
    //         });
    //         // Xóa bình luận khỏi danh sách
    //         setComments((prevComments) => prevComments.filter((_, i) => i !== index));
    //     } catch (error) {
    //         console.error('Lỗi khi xóa bình luận:', error);
    //     }
    // };


    //=================== NÚT ĐẶT HÀNG ========================
    const handleNavigateToRent = () => {
        navigation.navigate("Rent", {posts});
    }

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    });

    const carouselData = [
        {
            id: 1,
            image: require("../../../assets/images/hinh1.jpg"),
        },
        {
            id: 2,
            image: require("../../../assets/images/hinh4.jpg"),
        },
        {
            id: 3,
            image: require("../../../assets/images/hinh1.jpg"),
        },
        {
            id: 4,
            image: require("../../../assets/images/hinh4.jpg"),
        },
    ];
    const renderItem = ({ item, index }) => {
        return <View>
            <Image source={item.image} style={{height:200, width: screenWidth}} />
        </View>
    }

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.ceil(scrollPosition / screenWidth);
        setActiveIndex(index);
    }

    const renderDotIndicator = () => {
        return carouselData.map((dot, index) => {
            if(activeIndex === index) {
                return (
                    <View 
                    key={index}
                    style={{
                        backgroundColor: "green",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
                    </View>
                );
            } else {
                return (
                    <View 
                    key={index}
                    style={{
                        backgroundColor: "#CCCCCC",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
    
                    </View>
                );
            }

        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", marginVertical: 6, alignItems: "center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}
                    style={{
                        padding: 10,
                        borderRadius: 50, 
                        borderColor: COLORS.primary, 
                        borderWidth: 2, 
                        width: 50,
                        marginHorizontal: 8
                    }}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                    </TouchableOpacity>

                    <Text 
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                    }}>
                        {posts.content}
                    </Text>
                </View>
                <View>
                    <FlatList 
                    ref={flatListRef}
                    data={carouselData} 
                    getItemLayout={getItemLayout}
                    renderItem={renderItem} 
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true} 
                    pagingEnabled={true} 
                    onScroll={handleScroll}
                    showsHorizontalScrollIndicator={false}
                    />
                    <View
                    style={{
                        flexDirection: "row", 
                        justifyContent: 'center',
                        marginTop: 15,
                    }}>
                        {renderDotIndicator()}
                    </View>
                </View>
                <View 
                style={{
                    marginVertical: 12,
                    marginHorizontal: 12,
                }}>
                    <Text 
                    style={{ 
                        fontWeight: "bold", 
                        fontSize: 20,
                    }}>
                            <Ionicons name="shield-checkmark-outline" size={16}/> {posts.content}
                    </Text>
                    <Text>
                        <Ionicons name="location-outline" size={16}  /> {posts.house.address}
                    </Text>
                    <View style={{ flexDirection: "row"}}>
                        <Text>
                            Giá thuê: {posts.house.rent_price}
                        </Text>
                        <Text style={{ paddingLeft: 120}}>
                            Số phòng: {posts.house.room_count}
                        </Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20}}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        borderRadius: 15, 
                        borderWidth: 1,
                        borderColor: COLORS.grey,
                        }}>
                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4, 
                            width: 115, 
                            borderRightWidth: 1,
                            borderColor: COLORS.grey,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="map-outline" size={24} color="black" />
                            <Text>Đường đi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4,
                            width: 115, 
                            borderRightWidth: 1,
                            borderColor: COLORS.grey,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="share-social-outline" size={24} color="black" />
                            <Text>Chia sẽ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{ 
                            marginHorizontal: 4, 
                            width: 115,
                            padding: 20,
                            alignItems: "center"
                            }}>
                            <Ionicons name="flag-outline" size={24} color="black" />
                            <Text>Báo cáo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 16}}>
                    <View 
                    style={{ 
                        flexDirection: "row", 
                        alignItems: "center", 
                        borderRadius: 15, 
                        width: "94%",
                        height: 90,
                        backgroundColor: "#ccffd0"
                        }}>
                        <Image source={{ uri: posts.house.owner.avatar}} style={{ width: 50, height: 50, borderRadius: 25, marginHorizontal: 10 }} />

                        <View style={{ flex:1}}>
                            <Text style={{ fontSize: 16, fontWeight: "600"}}>Chủ nhà: {posts.house.owner.last_name}</Text>
                            <Text style={{ fontSize: 15, fontWeight: "700"}}>0375574702</Text>
                        </View>

                        <TouchableOpacity 
                        onPress={handlePhoneCall}
                        style={{
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            backgroundColor: "#007bff", 
                            borderRadius: 20, 
                            marginRight: 10 
                            }}>
                            <Ionicons name="call" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={handleChatMessage }
                        style={{
                            marginRight: 10, 
                            paddingHorizontal: 16, 
                            paddingVertical: 16, 
                            backgroundColor: "#28a745", 
                            borderRadius: 20
                            }}>
                            <Ionicons name="chatbubble" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                
                
                
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 12}}>Comments</Text>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, borderColor: COLORS.grey, borderRadius: 30, padding: 10 }}
                            placeholder="  Nhập nội dung bình luận..."
                            value={commentContent}
                            onChangeText={setCommentContent} 
                        />

                        <TouchableOpacity onPress={handleSendComment}  style={{ marginLeft: 10, padding: 15, backgroundColor: COLORS.primary, borderRadius: 10 }}>
                            <Text style={{ color: COLORS.white }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>

                    {comments.map((comment, index) => (
                        <View key={index} 
                        style={{ flexDirection: 'row', 
                        marginBottom: 10, 
                        alignItems: 'center', 
                        borderBottomWidth: 1, 
                        borderBottomColor: '#ccc' 
                        }}>
                            <Image source={{ uri: comment.user.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                            
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>{comment.user.first_name}</Text>
                                <Text>{comment.content}</Text>
                            </View>
                    
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={24} color="#999" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    
                    
                </View>
                


               
            </ScrollView>
            <View 
                style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    width: '100%', 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    padding: 8,
                    backgroundColor: COLORS.white,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                    }}>
                    <TouchableOpacity onPress={handleNavigateToRent} 
                    style={{ 
                        backgroundColor: COLORS.primary, 
                        padding: 10, 
                        borderRadius: 30, 
                        width: "48%",
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                        }}>
                        <Ionicons name="cart-outline" size={24} color={COLORS.white} />
                        <Text style={{ color: 'white' }}>Đặt phòng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setMyWishList([
                            ...wishList, posts
                        ])
                    }} 
                    style={{ 
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        padding: 10, 
                        borderRadius: 30, 
                        width: "48%",
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                        }}>
                        <Ionicons name="bookmark-outline" size={24} color={COLORS.primary} />
                        <Text style={{ color: COLORS.primary }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                
        </SafeAreaView>
    );
};
export default HouseDetails