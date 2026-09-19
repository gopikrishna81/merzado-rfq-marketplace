\# Merzado B2B RFQ Marketplace



A full-stack B2B Request for Quotation (RFQ) marketplace where buyers can post business requirements and suppliers can discover RFQs and submit quotations.



\## Features



\### Buyer

\- Register and log in as a Buyer

\- Create RFQs

\- Edit and delete/manage RFQs

\- View submitted RFQs

\- View quotations received from suppliers



\### Supplier

\- Register and log in as a Supplier

\- Browse available RFQs

\- Search RFQs by product, description, or delivery location

\- View complete RFQ details

\- Submit quotations

\- View previously submitted quotations



\### Security \& Validation

\- JWT-based authentication

\- Role-based authorization

\- Protected buyer and supplier routes

\- Server-side input validation

\- RFQ deadline validation

\- Quantity validation

\- Quotation price validation

\- Suppliers cannot quote on their own RFQs

\- Expired RFQs cannot receive quotations



\## Technology Stack



\### Frontend

\- React

\- Vite

\- React Router

\- Axios

\- CSS



\### Backend

\- Python

\- Django

\- Django REST Framework

\- Simple JWT



\### Database

\- MySQL

\- Django ORM



\## Architecture



The application follows a separate frontend/backend architecture.



```text

React Frontend

&#x20;     |

&#x20;     | REST API / JWT

&#x20;     v

Django REST Framework

&#x20;     |

&#x20;     | Django ORM

&#x20;     v

MySQL Database

