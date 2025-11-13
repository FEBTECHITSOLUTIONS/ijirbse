import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true , unique:true},
    role:{type:String , enum:['admin' , 'editor'] , default:'editor'},
    subRole:{type:String },
    address:{type:String },
    backGround:{type:String},
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },

    createdAt:{type:Date , default:Date.now}
})

export const userModel = mongoose.model('user' , userSchema)




const uploadedFileSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    affiliation: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    articleTitle: {
      type: String,
      // required: true,
      // trim: true,
    },
    uploadedManuscriptMetaData: {
      originalName: { type: String, required: true },
      filename: { type: String, required: true },
      size: { type: Number, required: true },
      url: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["submitted", "under_review", "accepted", "rejected"],
      default: "submitted",
    },
    published:{type:Boolean , default:false},
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const UploadedFile = mongoose.model("UploadedFile", uploadedFileSchema);








const journalIssueSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      enum: ["2023-2024", "2024-2025", "2025-2026"], 
    },
    volume: {
      type: Number,
      required: true,
    },
    issueNumber: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["latest", "archive"],
      default: "latest",
    },
    publishedArticles:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UploadedFile",
        required:true,
        unique:true
      },
      edditor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
      },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const JournalIssue =
  mongoose.models.JournalIssue || mongoose.model("JournalIssue", journalIssueSchema);