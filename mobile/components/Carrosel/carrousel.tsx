import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ==========================================
// TYPES
// ==========================================
type CarouselProps = {
  slides: { image: string; title: string; description: string }[];
};

interface NavigationButtonProps extends TouchableOpacityProps {
  disabled: boolean;
}

interface DotButtonProps extends TouchableOpacityProps {
  selected: boolean;
}

// ==========================================
// ARROW BUTTON COMPONENTS
// ==========================================
const PrevButton = ({ disabled, ...rest }: NavigationButtonProps) => (
  <TouchableOpacity
    disabled={disabled}
    className={`w-12 h-12 rounded-full border-[2px] border-gray-200 items-center justify-center bg-white ${
      disabled ? 'opacity-40' : 'opacity-100'
    }`}
    {...rest}
  >
    <ArrowLeft size={20} color={disabled ? '#9ca3af' : '#1f2937'} />
  </TouchableOpacity>
);

const NextButton = ({ disabled, ...rest }: NavigationButtonProps) => (
  <TouchableOpacity
    disabled={disabled}
    className={`w-12 h-12 rounded-full border-[2px] border-gray-200 items-center justify-center bg-white ${
      disabled ? 'opacity-40' : 'opacity-100'
    }`}
    {...rest}
  >
    <ArrowRight size={20} color={disabled ? '#9ca3af' : '#1f2937'} />
  </TouchableOpacity>
);

// ==========================================
// DOT BUTTON COMPONENT
// ==========================================
const DotButton = ({ selected, ...rest }: DotButtonProps) => (
  <TouchableOpacity className="mx-1 items-center justify-center" {...rest}>
    <View
      className={`w-2.5 h-2.5 rounded-full ${
        selected ? 'bg-gray-800 w-6' : 'bg-gray-300'
      }`}
    />
  </TouchableOpacity>
);

// ==========================================
// MAIN CAROUSEL COMPONENT
// ==========================================
export default function EmblaCarousel({ slides }: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setSelectedIndex(index);
  };

  const scrollTo = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const scrollPrev = useCallback(() => {
    if (selectedIndex > 0) scrollTo(selectedIndex - 1);
  }, [selectedIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    if (selectedIndex < slides.length - 1) scrollTo(selectedIndex + 1);
  }, [selectedIndex, slides.length, scrollTo]);

  const prevBtnDisabled = selectedIndex === 0;
  const nextBtnDisabled = selectedIndex === slides.length - 1;

  return (
    <View className="w-full py-4 relative">
      {/* Viewport */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH-30 }} className="px-3">
            <View className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
              {/* Image Fix: Ensure height and width are defined */}
              <Image
                source={{ uri: item.image }}
                className="w-full h-64"
                resizeMode="cover"
              />
              <View className="p-6">
                {/* Text Centering Fix: Use text-center */}
                <Text className="text-2xl font-bold text-slate-900 mb-2 text-center">
                  {item.title}
                </Text>
                <Text className="text-base text-slate-500 leading-relaxed text-center">
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Previous Button - Positioned on the left side */}
      <View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <PrevButton disabled={prevBtnDisabled} onPress={scrollPrev} />
      </View>

      {/* Next Button - Positioned on the right side */}
      <View className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <NextButton disabled={nextBtnDisabled} onPress={scrollNext} />
      </View>

      {/* Pagination Dots - Centered at bottom */}
      <View className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex-row justify-center items-center">
        {slides.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onPress={() => scrollTo(index)}
          />
        ))}
      </View>
    </View>
  );
}