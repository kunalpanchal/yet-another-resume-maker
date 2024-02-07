import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';

import { makeStyles } from '@mui/styles';
import Resume from './Resume';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const renderers = [
  ...materialRenderers,
  //...vanillaRenderers,	
  //register custom renderers
];

const App = () => {
  const classes = useStyles();
  const localData = localStorage.getItem('data')
  const [data, setData] = useState<any>(localData ? JSON.parse(localData) : {});
  const [view, setView] = useState<any>('form'); // ['form', 'resume']
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };

  const jsonFormOnChange = ({ errors, data }: any) => {
    localStorage.setItem('data', JSON.stringify(data))
    setData(data)
  }
  const backup = () => {
    const data = localStorage.getItem('data')
    if (data) {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
      a.download = `resume-${(new Date()).toUTCString()}.json`
      a.click()
    }
  }
  const restore = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          const data = JSON.parse(e.target.result)
          localStorage.setItem('data', JSON.stringify(data))
          setData(data)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <Fragment>
      <header className='flex justify-between bg-black text-white fixed top-0 w-full z-50'>
        <div className='flex'>
          <button onClick={e => setView('form')} className='ml-3'>Form</button>
          <button onClick={e => setView('resume')} className='ml-3'>Resume</button>
        </div>
        <div className='flex'>
          <button className='mr-3' onClick={backup}>Backup</button>
          <button className='mr-3' onClick={restore}>Restore</button>
        </div>
      </header>
      <Grid
        justifyContent={'center'}
        spacing={1}
        className="w-full p-5 mt-16"
      >
        {view === 'form' && <Grid item sm={12}>
          <Typography variant={'h4'} className={classes.title}>
            Resume Builder
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={jsonFormOnChange}
            />
          </div>
        </Grid>}

        {view === 'resume' && <Grid item sm={12}>
          <Resume data={data} />
        </Grid>}
      </Grid>
    </Fragment>
  );
};

export default App;
