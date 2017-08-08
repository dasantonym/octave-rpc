function varargout = apply_func (fxn, args)
  C = unpack_args (args);
  varargout = { feval(fxn, C{:}) };
endfunction
