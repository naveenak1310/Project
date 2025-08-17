
import streamlit as st
import os
from PIL import Image
import numpy as np
import pickle
import tensorflow
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import cv2

# Load embeddings and filenames with debugging
feature_list = np.array(pickle.load(open('D:\\review3\\MINI_PROJECT\\embeddings.pkl','rb')))
filenames = pickle.load(open('D:\\review3\\MINI_PROJECT\\filenames.pkl','rb'))  # Removed space before 'pkl'

# Initialize the ResNet50 model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

img = image.load_img('D:\\review3\\MINI_PROJECT\\sample\\jersy.jpg', target_size=(224, 224))
# img = image.load_img('D:\\review3\\MINI_PROJECT\\sample\\pant.jpg', target_size=(224, 224))
img_array = image.img_to_array(img)
expanded_img_array = np.expand_dims(img_array, axis=0)
preprocessed_img = preprocess_input(expanded_img_array)
result = model.predict(preprocessed_img).flatten()
normalized_result = result / norm(result)

neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
neighbors.fit(feature_list)

distances, indices = neighbors.kneighbors([normalized_result])

# print(indices)
for file in indices[0]:
    temp_img=cv2.imread(filenames[file])
    cv2.imshow('output',cv2.resize(temp_img,(512,512)))

cv2.waitKey(0)