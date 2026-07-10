import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from '../api/teamsApi';
import { useToast } from '../../../components/ui/ToastContext';
import { useNavigate } from 'react-router-dom';

export const useTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  });
};

export const useTeam = (id) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => getTeamById(id),
    enabled: !!id,
  });
};

export const useTeamMutations = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      addToast({ message: 'Equipo creado exitosamente' });
      navigate('/teams');
    },
    onError: (error) => {
      addToast({ message: `Error al crear equipo: ${error.message}`, type: 'error' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team', data.id] });
      addToast({ message: 'Equipo actualizado exitosamente' });
      navigate('/teams');
    },
    onError: (error) => {
      addToast({ message: `Error al actualizar equipo: ${error.message}`, type: 'error' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      addToast({ message: 'Equipo eliminado' });
    },
    onError: (error) => {
      addToast({ message: `Error al eliminar equipo: ${error.message}`, type: 'error' });
    },
  });

  return {
    createTeam: createMutation.mutate,
    updateTeam: updateMutation.mutate,
    deleteTeam: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
