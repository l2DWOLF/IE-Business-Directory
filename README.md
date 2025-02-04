# IE Business Directory

## Business Directory Management App

A front-end application designed for managing and searching businesses. Users can explore, filter, and view business cards, as well as add, edit, and delete their own cards. This project focuses solely on the front-end implementation.

## Features
- **Search and Filter**: Search business cards by title, subtitle, description, website, email, or phone number.
- **Pagination**: View business cards with pagination and load more results.
- **Card Management**: Add, edit, and delete personal business cards.
- **User Authentication**: Users can manage their own cards through authentication.
- **Role-based Access**:
  - **Regular Users**: Register to save and like cards.
  - **Business Users**: Create and manage business cards.
  - **Admin Users**: Access a users CRM for administrative tasks.

## Technologies Used
- **React.js** for building the user interface.
- **Redux** for state management.
- **Axios** for handling API requests.
- **Lucide React Icons** for icons.
- **Context API** (for global state like search query).
- **React Router** for navigation.
- **Yup** for form validation.
- **Formik** for building and handling forms.
- **React Toastify** for displaying notifications.

## Connecting to the Backend
This project connects to a backend built with **Node.js**, **Express**, and **MongoDB**. The backend handles user authentication, card data retrieval, and updates, while the front-end provides the user interface.

**Note**: The backend and database are not included in this repository. To use the application, you will need to integrate it with a Node.js/Express backend that uses MongoDB.

## Live Demo
You can explore the live version of the app here: [IE Business Directory](https://ie-business-directory.onrender.com/).

## Key Features and Usage

### 1. Search Business Cards
- Search for business cards by title, subtitle, description, website, email, or phone number using the search bar.
- Results will be filtered and displayed accordingly.

### 2. Manage Cards
- **Add New Card**: Add a new business card by clicking the "Add New Business" button.
- **Edit Card**: Edit your business cards by selecting the "Edit" option on a card.
- **Delete Card**: Delete cards you no longer need.
