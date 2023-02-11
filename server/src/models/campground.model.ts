import * as mongoose from 'mongoose'

interface CampgroundBase {
  title: string
  location: string
  price: number
  description: string
  image: string
}

interface CampgroundDocument extends CampgroundBase, mongoose.Document {
  createdAt: Date
  updatedAt: Date

  // Add any custom methods, virtuals, etc. here 👇🏼
  // example:
  // comparePassword: (candidatePassword: string) => Promise<boolean>
}

const campgroundSchema = new mongoose.Schema<CampgroundDocument>({
  title: {
    type: String,
    required: [true, 'Campground title is required'],
    trim: true,
    maxlength: 100
  },
  location: {
    type: String,
    required: [true, 'Campground location is required'],
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: [true, 'Campground price is required'],
    min: 0
  },
  description: {
    type: String,
    required: [true, 'Campground description is required'],
    trim: true,
    maxlength: 10000
  },
  image: {
    type: String,
    default: 'https://source.unsplash.com/collection/483251'
  }
})

export const CampgroundModel = mongoose.model<CampgroundDocument>(
  'Campground',
  campgroundSchema
)
