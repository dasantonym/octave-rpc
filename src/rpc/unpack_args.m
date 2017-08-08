function varargout = unpack_args (args)
  if (ismatrix (args))
    varargout = { mat2cell(args, 1) };
  elseif (isscalar (args))
    varargout = cell ({ args });
  elseif (iscell (args))
    varargout = args;
  endif
endfunction
