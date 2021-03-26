import React, { useEffect, useState , forwardRef} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import st from './list.module.scss'
import {FETCH_SIZES} from "../../../redux/actions/ecommerce/sizes";
import {FETCH_SIZES_SUCCESS} from "../../../redux/reducers/ecommerce/sizes";
import classNames from 'classnames'
import { restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { SIZE_LOG_ADD } from "../../../redux/reducers/cms/editSize";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {LOGIN} from "../../../redux/reducers/account/login";

const Item = forwardRef(({id, setId, selectedId, ...props}, ref) => {
  return ( <li  className={id === selectedId ? classNames(st.selected, st.listItem) : st.listItem} onClick={() => setId(id)} {...props} ref={ref} >
    {props.children}
  </li> )
});

export const titles = {
  segments: 'Segment',
  measurements: 'Measurement',
  physiques: 'Physique',
  sizes: 'Size'
};

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (<Item setId={props.setId} selectedId={props.selectedId} ref={setNodeRef} id={props.id} style={style} {...attributes} {...listeners}>
      <h6>{props.name}</h6><span> x </span>

    </Item>
  );
}
{/*<li ref={setNodeRef} style={style} {...attributes} {...listeners}>*/}
{/* {props.name}*/}
{/*</li>*/}

function SortList({ its = [], item = null, setId = (id) => {}, selected = null }) {

    const [items, setItems ] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeName, setActiveName] = useState(null);
  // function sortFunc(a, b) {
  //   var sortingArr = ["A", "B", "C"];
  //   return sortingArr.indexOf(a.type) - sortingArr.indexOf(b.type);
  // }


  useEffect(() => {
    setItems(its.map(i => i.id));
  }, [its]);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map( i => its.find(k => k.id === i)).filter(k => typeof k !== 'undefined').map(i =>
            <SortableItem setId={setId} selectedId={selected} key={i.id} id={i.id} name={i.name}/>
            )}
          {/*{items.map(i =>*/}
          {/*  <SortableItem key={i} id={i}/>*/}
          {/*)}*/}
        </SortableContext>
        {/*<DragOverlay>*/}
        {/*  {activeId ? (*/}
        {/*    <SortableItem id={activeId} name={activeName}/>*/}
        {/*  ): null}*/}
        {/*</DragOverlay>*/}
      </DndContext>
  );


  function handleDragStart(event) {
    setActiveId(event.active.id);
    setActiveName(its.find(k => k.id === event.active.id).name);
  }


  function handleDragEnd(event) {
    const {active, over} = event;
    console.log(active, over)
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i === active.id);
        const newIndex = items.findIndex(i => i === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
    setActiveName(null);

  }
}

export default function MeasurementList(){

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: FETCH_SIZES});
  }, []);

  const [addBoxActive, setAddBoxActive] = useState(null);
  const [addValue, setAddValue] =  useState('');



  const [segmentId, setSegmentId] = useState(0);
  const [physiqueId, setPhysiqueId] = useState(0);
  const [measurementId, setMeasurementId] = useState(0);

  const segments = useSelector(state => state.sizes.readyStatus !== FETCH_SIZES_SUCCESS
    ? [] : Object.keys(state.sizes.data).map(k => state.sizes.data[k]));

  const selectedSegment = segments.find(s => s.id === segmentId) || null;
  const selectedPhysique = selectedSegment === null || !('physiques' in selectedSegment)
    ? null : selectedSegment.physiques.find(s => s.id === physiqueId) || null;
  const selectedMeasurement = selectedPhysique === null || !('measurements' in selectedPhysique)
    ? null : selectedPhysique.measurements.find(s => s.id === measurementId) || null;

  console.log(segments)
  console.log(selectedSegment)
  console.log(selectedPhysique)

  const AddButton = ({ type }) =>
    <li onClick={() => openAddBox(type)}> + </li>
  ;

  const openAddBox = (type) => {
    setAddBoxActive(type)
  };


  const handleAdd = e => {
    e.preventDefault();
    dispatch({
      type: SIZE_LOG_ADD,
      name: addValue,
      item: addBoxActive,
    });
  };

  return (
    <React.Fragment>
      <div className={st.sizeTableContainer}>
        <div className={st.sizeTableButtonList}>
          <button>Edit</button>
        </div>
        <div className={st.sizeTable}>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>
              <h4>Segments </h4>
            </div>
            <ul>

              <SortList
                its = { segments.sort((a, b) => a.item_order - b.item_order)}
                setId={setSegmentId}
                item={'segment'}
                selected={segmentId}
              />
              <AddButton type={'segments'}/>
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>

              <h4>Physiques </h4>
            </div>
            <ul>

              <SortList
                its = { selectedSegment === null || !('physiques' in selectedSegment) ?
                  [] : selectedSegment.physiques.sort((a, b) => a.item_order - b.item_order)}
                item={'physique'}
                setId={setPhysiqueId}
                selected={physiqueId}
              />
              <AddButton type={'physiques'}/>
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.wide)}>

            <div className={st.title}>

              <h4>Measurements </h4>

            </div>
            <ul>
              {selectedPhysique === null || !('measurements' in selectedPhysique) ? null :
                <SortList
                  its={selectedPhysique === null || !('measurements' in selectedPhysique) ?
                    [] : selectedPhysique.measurements.sort((a, b) => a.item_order - b.item_order)}
                  item={'measurement'}
                  setId={setMeasurementId}
                  selected={measurementId}
                />
              }
              <AddButton type={'measurements'}/>
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>
              <h4>Sizes</h4>
            </div>
            <ul>

              <SortList
                its = {selectedMeasurement === null || !('sizes' in selectedMeasurement) ?
                  [] : selectedMeasurement.sizes.sort((a, b) => a.item_order - b.item_order)}
                item={'size'}
              />
              <AddButton type={'sizes'}/>
            </ul>
          </div>
        </div>
      </div>
      <div className={addBoxActive !== null ? st.addBoxContainer : classNames(st.addBoxContainer, st.hidden)}>
        <div>
          <form onSubmit={handleAdd}>

              <h4 className={st.title}>{addBoxActive == null ? '': `Name of the New ${titles[addBoxActive]}`}</h4>
              <input type="string"
                     value={addValue}
                     onChange={e => setAddValue(e.target.value)}/>
              <button className={st.addBoxOkButton} type="submit">
                Add New {titles[addBoxActive]}
              </button>
              <button className={st.addBoxCancelButton} onClick={() => setAddBoxActive(null)} type="button" >
                Cancel
              </button>

          </form>
        </div>
      </div>
    </React.Fragment>
  )

}
