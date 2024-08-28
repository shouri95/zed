import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  status: 'In Progress' | 'Pending' | 'Completed';
  description?: string;
  project?: string;
  tags?: string[];
}

export function RightSideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: "Write Act 1", status: "In Progress" },
    { id: '2', name: "Research character backstories", status: "Pending" },
    { id: '3', name: "Outline Act 2", status: "In Progress" },
    { id: '4', name: "Write dialogue for Act 3", status: "Pending" },
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const pathname = usePathname();

  const projects = ["The Raay Screenplay", "The Raay Screenplay 2", "The Raay Screenplay 3"];

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setEditedTask(task);
    setSelectedTaskId(task.id);
  };

  const updateTask = () => {
    if (editedTask) {
      setTasks(tasks.map(t => t.id === editedTask.id ? editedTask : t));
      setSelectedTask(editedTask);
    }
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setSelectedTaskId(null);
  };

  const addTag = (tag: string) => {
    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        tags: [...(editedTask.tags || []), tag]
      };
      setEditedTask(updatedTask);
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (editedTask && editedTask.tags) {
      const updatedTask = {
        ...editedTask,
        tags: editedTask.tags.filter(tag => tag !== tagToRemove)
      };
      setEditedTask(updatedTask);
    }
  };

  const highlightStyle = (taskId: string) => ({
    backgroundColor: selectedTaskId === taskId ? '#f0f8ff' : 'transparent',
  });

  return (
    <div 
      className={`fixed top-[64px] right-0 h-[calc(100vh-64px)] bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-12'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-0 transform -translate-x-full bg-white p-2 rounded-l-md shadow-md"
      >
        {isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {isExpanded && (
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
          </div>

          {!selectedTask ? (
            <ScrollArea className="flex-grow">
              <div className="p-4 space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="task-item group cursor-pointer"
                    style={highlightStyle(task.id)}
                    onClick={() => selectTask(task)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {task.name}
                      </span>
                      <Badge variant={task.status === "In Progress" ? "default" : "secondary"} className="text-xs">
                        {task.status}
                      </Badge>
                    </div>
                    <Separator className="bg-gray-200" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-grow overflow-auto p-4">
              <Button variant="ghost" onClick={closeTaskDetails} className="mb-4">
                <ChevronLeft size={16} className="mr-2" /> Back to list
              </Button>
              <Input
                value={editedTask?.name || ''}
                onChange={(e) => setEditedTask({ ...editedTask!, name: e.target.value })}
                className="mb-4"
              />
              <Select
                value={editedTask?.status}
                onValueChange={(value: 'In Progress' | 'Pending' | 'Completed') => 
                  setEditedTask({ ...editedTask!, status: value })
                }
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={editedTask?.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask!, description: e.target.value })}
                placeholder="Task description"
                className="mb-4"
              />
              <Select
                value={editedTask?.project}
                onValueChange={(value) => setEditedTask({ ...editedTask!, project: value })}
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedTask?.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                      {tag}
                      <X size={12} className="ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addTag(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                  className="border-gray-300"
                />
              </div>
              <Button onClick={updateTask}>Save Changes</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}