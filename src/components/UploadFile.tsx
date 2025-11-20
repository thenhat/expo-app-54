import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

interface UploadFileProps {
  onChange: (file: DocumentPicker.DocumentPickerResult | null) => void;
  reset: boolean; // Thêm prop reset
}

const UploadFile: React.FC<UploadFileProps> = ({ onChange, reset }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      console.log("result", result);

      if (result.canceled) return;
      setFileName(result.assets?.[0]?.name || "no-name");
      onChange(result);
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  useEffect(() => {
    if (reset) {
      setFileName(null);
      onChange(null);
    }
  }, [reset]);

  return (
    <View className="pt-4 items-start flex-row gap-[16px]">
      <TouchableOpacity
        className="border-[#2F265D] border px-3 rounded-full h-[40px] items-center justify-center"
        onPress={pickDocument}
      >
        <Text className="text-[#2F265D] font-semibold">Choose file</Text>
      </TouchableOpacity>

      {fileName && (
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-[#2F265D] mt-2 line-clamp-1"
          style={{ flexShrink: 1 }}
        >
          {fileName}
        </Text>
      )}
    </View>
  );
};

export default UploadFile;
