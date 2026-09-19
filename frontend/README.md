# Merzado RFQ Marketplace

A full-stack B2B Request for Quotation (RFQ) marketplace built as part of the Merzado Software Development Internship assignment.

The platform allows buyers to publish business requirements and suppliers to discover those requirements and submit quotations.

## Features

### Authentication
- User registration and login
- Buyer and Supplier roles
- JWT-based authentication
- Automatic access-token refresh
- Protected routes
- Role-based authorization

### Buyer
- Create RFQs
- Edit RFQs
- Delete RFQs
- View own RFQs
- View quotations received for an RFQ
- RFQ fields:
  - Product/service name
  - Requirement description
  - Quantity
  - Delivery location
  - RFQ deadline

### Supplier
- Browse available RFQs
- Search RFQs
- View RFQ details
- Submit quotations
- View submitted quotations
- Quotation fields:
  - Price
  - Estimated delivery time
  - Message/notes

### Validation & Security
- Authentication required for protected APIs
- Role-based API permissions
- Password validation
- Positive quantity validation
- Non-negative quotation price validation
- RFQ deadline validation
- Suppliers cannot quote on their own RFQs
- Suppliers cannot submit quotations after the RFQ deadline
- Environment variables used for secrets and database configuration

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT

### Database
- MySQL
- Django ORM

## Project Structure

```text
merzado-rfq/
│
├── backend/
│   ├── accounts/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── ...
│   │
│   ├── rfqs/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── permissions.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── ...
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md