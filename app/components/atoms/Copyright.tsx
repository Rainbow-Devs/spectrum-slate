
function Copyright(props: any) {
  return (
    <div className="text-center text-xs text-gray-700" {...props}>
    {'Copyright © '}
    <a className="text-inherit" href="https://mui.com/">
      Spectrum Slate
    </a>{' '}
    {new Date().getFullYear()}
    {'.'}
  </div>
  
  );
}

export default Copyright