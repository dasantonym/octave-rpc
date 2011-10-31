function varargout = apply (fxn, xs)
  varargout = {feval(fxn, xs{:})};
end
