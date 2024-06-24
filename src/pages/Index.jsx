import React, { useState, useRef } from "react";
import { Box, Container, VStack, Heading, Text, Input, Button, Image, SimpleGrid, useToast } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddPhoto = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos([...photos, e.target.result]);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        toast({
          title: "Photo uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(selectedFile);
    } else if (newPhotoUrl) {
      setPhotos([...photos, newPhotoUrl]);
      setNewPhotoUrl("");
      toast({
        title: "Photo URL added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please select a file or enter a URL",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          PhotoShare
        </Heading>
        
        <Box bg="gray.100" p={6} borderRadius="md">
          <VStack spacing={4}>
            <Heading as="h2" size="lg">
              Upload a New Photo
            </Heading>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              display="none"
            />
            <Button
              onClick={() => fileInputRef.current.click()}
              leftIcon={<FaCloudUploadAlt />}
              colorScheme="teal"
              mb={2}
            >
              Select Photo
            </Button>
            <Text fontSize="sm" mb={2}>
              {selectedFile ? `Selected file: ${selectedFile.name}` : 'No file selected'}
            </Text>
            <Text fontSize="sm" mb={2}>Or</Text>
            <Input
              placeholder="Enter photo URL"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              mb={2}
            />
            <Button
              leftIcon={<FaCloudUploadAlt />}
              colorScheme="blue"
              onClick={handleAddPhoto}
              isDisabled={!selectedFile && !newPhotoUrl}
            >
              Add Photo
            </Button>
          </VStack>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Photo Feed
          </Heading>
          {photos.length === 0 ? (
            <Text textAlign="center">No photos uploaded yet. Be the first!</Text>
          ) : (
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt={`Uploaded photo ${index + 1}`}
                  borderRadius="md"
                  objectFit="cover"
                  boxSize="100%"
                  aspectRatio="1"
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;