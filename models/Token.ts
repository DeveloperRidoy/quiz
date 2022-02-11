import mongoose from 'mongoose'
import { ETokenType} from '../utils/types/types'

const TokenSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: [ETokenType.AUTH, ETokenType.RECOVER_PASSWORD],
        message: `tokenType must be either ${ETokenType.AUTH} or ${ETokenType.RECOVER_PASSWORD}`,
      },
      required: [true, 'tokenType is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'userId is required'],
    },
    expiresAt: {
      type: Date,
      required: [true, 'expiresAt is required'],
    },
  },
  { timestamps: true }
)

TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Token || mongoose.model('Token', TokenSchema)
