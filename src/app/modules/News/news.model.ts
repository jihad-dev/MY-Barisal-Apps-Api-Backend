import { Schema, model } from 'mongoose';
const newsSchema = new Schema<INews>(
    {
        image: {
            type: String,
            required: [true, 'ইমেজ ইউআরএল আবশ্যক']
        },
        link: {
            type: String,
            required: [true, 'নিউজের লিঙ্ক আবশ্যক']
        }
    },
    {
        timestamps: true 
    }
);


const News = model<INews>('News', newsSchema);
export default News;