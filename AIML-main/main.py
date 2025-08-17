import streamlit as st
import os
from PIL import Image
import numpy as np
import pickle
import tensorflow
import cv2
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm

feature_list = np.array(pickle.load(open('D:\\review3\\MINI_PROJECT\\embeddings.pkl', 'rb')))

filenames = pickle.load(open('D:\\review3\\MINI_PROJECT\\filenames.pkl','rb'))

# Initialize the ResNet50 model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = tensorflow.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

# Streamlit app title
st.title("Fashion Recommendation System")

# Function to save uploaded file
def save_uploaded_file(uploaded_file):
    try:
        file_path = os.path.join('uploads', uploaded_file.name)
        with open(file_path, 'wb') as f:
            f.write(uploaded_file.getbuffer())
        return file_path
    except Exception as e:
        print(f"Error: {e}")
        return None

# Feature extraction function
def feature_extraction(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    return normalized_result

# Recommendation function
def recommand(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    
    # Ensure feature_list is 2D before fitting
    if feature_list.ndim == 1:
        feature_list = feature_list.reshape(-1, 1)
    
    neighbors.fit(feature_list)
    distance, indices = neighbors.kneighbors([features])
    return indices

# File upload functionality
upload_file = st.file_uploader("Choose an Image")
if upload_file is not None:
    file_path = save_uploaded_file(upload_file)
    if file_path:
        display_image = Image.open(file_path)
        st.image(display_image)

        features = feature_extraction(file_path, model)
        indices = recommand(features, feature_list)

        # Display recommendations
        col1, col2, col3, col4, col5 = st.columns(5)
        with col1:
            st.image(filenames[indices[0][0]],width=80)
        with col2:
            st.image(filenames[indices[0][1]],width=80)
        with col3:
            st.image(filenames[indices[0][2]],width=80)
        with col4:
            st.image(filenames[indices[0][3]],width=80)
        with col5:
            st.image(filenames[indices[0][4]],width=80)
    else:
        st.header("Some error occurred in file upload.")





















# import streamlit as st
# import os
# from PIL import Image
# import numpy as np
# import pickle
# import tensorflow
# from tensorflow.keras.applications import ResNet50
# from tensorflow.keras.layers import GlobalMaxPooling2D
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.applications.resnet50 import preprocess_input
# from sklearn.neighbors import NearestNeighbors
# from numpy.linalg import norm

# # Load embeddings and filenames
# feature_list = np.array(pickle.load(open('D:\\review3\\MINI_PROJECT\\embeddings.pkl', 'rb')))
# filenames = pickle.load(open('D:\\review3\\MINI_PROJECT\\filenames. pkl', 'rb'))  # Removed extra space

# # Initialize the ResNet50 model
# model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
# model.trainable = False
# model = tensorflow.keras.Sequential([
#     model,
#     GlobalMaxPooling2D()
# ])

# # Streamlit app title
# st.title("Fashion Recommendation System")

# # Function to save uploaded file
# def save_uploaded_file(uploaded_file):
#     try:
#         file_path = os.path.join('uploads', uploaded_file.name)
#         with open(file_path, 'wb') as f:
#             f.write(uploaded_file.getbuffer())
#         return file_path
#     except Exception as e:
#         print(f"Error: {e}")
#         return None

# # Feature extraction function
# def feature_extraction(img_path, model):
#     img = image.load_img(img_path, target_size=(224, 224))
#     img_array = image.img_to_array(img)
#     expanded_img_array = np.expand_dims(img_array, axis=0)
#     preprocessed_img = preprocess_input(expanded_img_array)
#     result = model.predict(preprocessed_img).flatten()
#     normalized_result = result / norm(result)
#     return normalized_result

# # Recommendation function
# def recommand(features, feature_list):
#     neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
#     neighbors.fit(feature_list)
#     distance, indices = neighbors.kneighbors([features])
#     return indices

# # File upload functionality
# upload_file = st.file_uploader("Choose an Image")
# if upload_file is not None:
#     file_path = save_uploaded_file(upload_file)
#     if file_path:
#         display_image = Image.open(file_path)
#         st.image(display_image)

#         features = feature_extraction(file_path, model)
#         indices = recommand(features, feature_list)

#         # Limit the number of columns to the actual number of neighbors
#         num_neighbors = len(indices[0])  # Get the actual number of neighbors returned
        
#         # Adjust how many images are displayed based on the number of available indices
#         for i in range(1, num_neighbors):  # Start from 1 to skip the query image itself
#             col = st.columns(num_neighbors - 1)
#             with col[i-1]:
#                 st.image(filenames[indices[0][i]])  # Only display up to the available neighbors
#     else:
#         st.header("Some error occurred in file upload.")


#streamlit run d:/review3/MINI_PROJECT/main.py