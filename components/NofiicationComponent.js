import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  useNotifications,
  useNovuContext
} from '@novu/notification-center';
import { useEffect, useRef, useState } from 'react';
import { HeadlessService, FetchResult, ISession } from '@novu/headless';


const NofiicationComponent = ({user}) => {
    const ref = useRef()

  const [init,setInit]= useState(false)
    const headlessService = new HeadlessService({
      applicationIdentifier: 'oE8EO85MyIuN',
      subscriberId: `${user.user_id}`,
    });




    headlessService.initializeSession({
      listener: (res) => {

      },
      onSuccess: (session) => {
      },
      onError: (error) => {
      },
    });


    // useEffect(()=>{
    //   if(init){
    //     headlessService?.fetchNotifications({
    //       listener: ({ data, error, isError, isFetching, isLoading, status }) => {
    //         console.log({ data, error, isError, isFetching, isLoading, status });
    //       },
    //       onSuccess: (response) => {
    //         console.log(response.data, response.page, response.totalCount, response.pageSize);
    //       },
    //       page: 1, // page number to be fetched
    //     });
    //   }
    // },[init])

   
  return (
    <NovuProvider subscriberId={`${user.user_id}__man`} applicationIdentifier={'oE8EO85MyIuN'}>
      <CustomNotify />
      <PopoverNotificationCenter   colorScheme={'light'}>
        
        {({ unseenCount }) => <NotificationBell ref={ref} unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};   

export default NofiicationComponent



const CustomNotify = ()=>{
  const context = useNovuContext({
    'fetchingStrategy':{
      'fetchNotifications':true
    }
  });
  const result = useNotifications();


  const handleNotifyDispaly = ()=>{
    let localNotifyCount = window.localStorage.getItem('localNotifyCount')
    if(!localNotifyCount){
      localStorage.setItem('localNotifyCount',JSON.stringify(0))
      localNotifyCount = 0
    }else{
      localNotifyCount = JSON.parse(window.localStorage.getItem('localNotifyCount'))
    }
    if (result.unseenCount !==0){
      if(localNotifyCount!=result.unseenCount){
        localStorage.setItem('localNotifyCount',JSON.stringify(result.unseenCount ))
        const greeting = new Notification(`You have ${result.unseenCount} unread message in MAN app`);
      }

    }
  }
  useEffect(()=>{
    // if(type window !===)
    handleNotifyDispaly()
  },[result])

const handleNofiy =async ()=>{
  let permission = await Notification.requestPermission();

}
  useEffect(()=>{
    handleNofiy()
  },[])


 
  return(
    <div>

    </div>
  )
}