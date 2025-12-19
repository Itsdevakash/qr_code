import { Button, Form, Input, Modal, QRCode } from 'antd'
import generateCalendar from 'antd/es/calendar/generateCalendar'
import '@ant-design/v5-patch-for-react-19';
import { Download } from 'lucide-react'
import React, { useRef, useState } from 'react'

export default function App() {
  const [form] = Form.useForm()
  const divRef = useRef(null)
  const [qr,setQr] = useState({
    url:'https://vidyaansoftware.com',
    icon:'',
    bgColor:'white',
    color:'black'
  })
  const [open,setOpen] = useState(false)
  const [logo,setLogo] = useState('')


  const Downloadnow = ()=>{
    const div = divRef.current
    const canvas =  div.querySelector("canvas")
   const base64string =  canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = base64string
    a.download = "qr-code.png"
    a.click()
    a.remove()
  }

  const generateqrcode = (values)=>{
  values.bgColor =  values.bgColor || "white"
  values.color =  values.color || "black"
  values.icon = logo 
 
     setOpen(false)


    setQr((prev)=>({
      ...prev,
      ...values
    }))
 
  }

  const choosefile = (e)=>{
    const file = e.target.files[0]
    const url =URL.createObjectURL(file)
    setLogo(url)
  }

  const hadleClose = ()=>{
    setOpen(false)
    form.resetFields()
    setLogo('')
  }

  
  const openmodel =()=>{
      setOpen(true)
       form.resetFields()
    setLogo('')
  }


  return (
    <div className='bg-gray-100 h-screen py-5 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-16'>The QR Code Generator</h1>
      <div ref={divRef} className=' mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-115 transition-transform duration-300 hover:shadow-2xl'> 
        <QRCode 
        value={qr.url}
        size={300}  
        icon={qr.icon}
        bgColor={qr.bgColor}
        color={qr.color}    
        />   
      </div>


      <div className='flex gap-8'>

        
       <Button         
        size='large' 
        type='primary' 
        className='!bg-gradient-to-r !from-violet-600 !via-blue-500 to-indigo-600 '
        icon={<Download  className='w-4 h-4'/>}
        onClick={openmodel}        
        >New Qr code
        </Button>


        <Button         
        size='large' 
        type='primary' 
        className='!bg-gradient-to-r !from-rose-600 !via-red-500 to-rose-600 '
        icon={<Download  className='w-4 h-4'/>}
        onClick={Downloadnow}        
        >Download Now
        </Button>


      </div>


      <Modal open={open}  footer={null} onCancel={hadleClose}>
  <h1 className='text-lg font-medium'>Generate Your Qr</h1>

    <Form onFinish={generateqrcode} form={form}>

        <Form.Item label="Url" rules={[{required:true,type:"url"}]} name="url" >
          <Input
          size='large'
          placeholder='https://www.youtube.com'
          />
        </Form.Item>

        <Form.Item label="BG Color"  name="bgColor" >
          <Input
          type='color'
          size='large'     
          />
        </Form.Item>        
     
        <Form.Item label="Color"  name="color" >
          <Input
          type='color'
          size='large'     
          />
        </Form.Item>


        <Form.Item label="Logo"  name="logo" >
          <Input
          type='file'
          size='large' 
          accept='image/*'    
          onChange={choosefile}
          />
        </Form.Item>

        <Form.Item>
          <Button size='large' type='primary' htmlType='submit'>Generate</Button>
        </Form.Item>



    </Form>


      </Modal>


    </div>
  )
}
