"use client";

import { useState, useMemo } from "react";
import { shuffle } from "@/utils/shuffle";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface BlockPuzzleProps {
  blocks: string[];
  correctOrder: number[];
  onCorrect: () => void;
  onWrong: () => void;
}

function SortableBlock({ id, block }: { id: string; block: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-mono text-sm
        shadow-sm active:cursor-grabbing
        ${isDragging ? "opacity-50 shadow-lg" : "hover:border-[#58CC02]"}
      `}
    >
      {block}
    </div>
  );
}

export function BlockPuzzle({ blocks, correctOrder, onCorrect, onWrong }: BlockPuzzleProps) {
  const initialOrder = useMemo(() => shuffle([...correctOrder]), []);
  const [order, setOrder] = useState<number[]>(initialOrder);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const items = order.map((i) => blocks[i]);
  const sortableIds = items.map((_, i) => `block-${i}`);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortableIds.indexOf(active.id as string);
    const newIndex = sortableIds.indexOf(over.id as string);
    const newOrder = arrayMove(order, oldIndex, newIndex);
    setOrder(newOrder);
  };

  const handleCheck = () => {
    if (hasChecked) return;
    const correct = order.every((val, idx) => val === correctOrder[idx]);
    setIsCorrect(correct);
    setHasChecked(true);
    if (correct) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const handleReset = () => {
    setOrder(shuffle([...correctOrder]));
    setHasChecked(false);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Puzzle</h3>
      <p className="text-gray-600">Drag the code blocks into the correct order.</p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((block, index) => (
              <SortableBlock key={sortableIds[index]} id={sortableIds[index]} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex gap-4">
        <button
          onClick={handleCheck}
          disabled={hasChecked}
          className="rounded-full bg-[#58CC02] px-8 py-3 font-bold text-white transition hover:bg-[#46A302] disabled:opacity-50"
        >
          Check Answer
        </button>
        {hasChecked && !isCorrect && (
          <button
            onClick={handleReset}
            className="rounded-full border-2 border-gray-300 px-8 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Try Again
          </button>
        )}
      </div>

      {hasChecked && isCorrect !== null && (
        <p
          className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}
        >
          {isCorrect ? "Correct! Great job!" : "Not quite. Rearrange the blocks and try again."}
        </p>
      )}
    </div>
  );
}
