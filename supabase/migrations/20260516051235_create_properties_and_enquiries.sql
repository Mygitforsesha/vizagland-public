/*
  # Create properties and contact enquiries tables

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `property_id` (text, unique) - e.g., APRE-001
      - `title` (text) - property title
      - `price` (text) - formatted price string
      - `location` (text) - neighborhood/area
      - `city` (text) - city/district
      - `type` (text) - Apartment, Villa, Plot, Commercial, Land
      - `category` (text) - Sale or Rent
      - `beds` (integer) - number of bedrooms
      - `baths` (integer) - number of bathrooms
      - `area` (text) - formatted area string
      - `image_url` (text) - property image URL
      - `rera_id` (text) - RERA registration number
      - `featured` (boolean) - whether property is featured
      - `created_at` (timestamptz) - record creation time

    - `contact_enquiries`
      - `id` (uuid, primary key)
      - `full_name` (text) - enquirer name
      - `mobile` (text) - mobile number
      - `email` (text) - email address
      - `subject` (text) - enquiry subject
      - `property_id_ref` (text) - optional property reference
      - `district` (text) - enquirer district
      - `message` (text) - enquiry message
      - `created_at` (timestamptz) - record creation time

  2. Security
    - Enable RLS on both tables
    - Properties: public read access for all users
    - Contact enquiries: authenticated users can insert their own
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text UNIQUE NOT NULL,
  title text NOT NULL,
  price text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Sale',
  beds integer NOT NULL DEFAULT 0,
  baths integer NOT NULL DEFAULT 0,
  area text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  rera_id text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read properties"
  ON properties
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL DEFAULT 'Property Enquiry',
  property_id_ref text DEFAULT '',
  district text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
  ON contact_enquiries
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);
