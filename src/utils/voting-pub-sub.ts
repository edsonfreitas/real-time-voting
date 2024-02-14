
//Pub/Sub - Publish Subscribers
type Message = () =>{ pollOptionId: string, votes: number};
type Subscriber= (message: Message) => void

class VotinPubSub{
  private clannels: Record<string, Subscriber[]> ={};

  subscribe(pollId: string, subscribe: Subscriber ){
    if(!this.clannels[pollId]){
      this.clannels[pollId] = [];
    }
    this.clannels[pollId].push(subscribe)
   }

   publish(pollId: string , message:Message){
     if(!this.clannels[pollId]){
      return;
    }

    for( const subscribe  of this.clannels[pollId]){
       subscribe(message);
    }

  }
}

export const voting =  new VotinPubSub();
