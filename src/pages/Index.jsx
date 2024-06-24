import React, { useState } from "react";
import { Box, Container, VStack, Heading, Text, Input, Button, Image, SimpleGrid } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const handleAddPhoto = () => {
    if (newPhotoUrl) {
      setPhotos([...photos, newPhotoUrl]);
      setNewPhotoUrl("");
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
              placeholder="Enter photo URL"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
            />
            <Button
              leftIcon={<FaCloudUploadAlt />}
              colorScheme="blue"
              onClick={handleAddPhoto}
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