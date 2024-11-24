import { Schema,model } from "mongoose"

interface iprops{
user:String,
text:String,
createdAt:String,
replies:[]
}
interface ipropsData extends iprops, Document{}

const commentModel = new Schema<ipropsData>(
    {
        user: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        replies: [{
            type: Schema.Types.ObjectId,
            ref: "comments"
        }]
    },
    {timestamps:true}
)

export default model<ipropsData>("comment",commentModel)