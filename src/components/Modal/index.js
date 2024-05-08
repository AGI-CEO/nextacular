import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Dynamically import Dialog and Transition for client-side rendering only
const Dialog = dynamic(() => import('@headlessui/react').then((mod) => mod.Dialog), {
  ssr: false,
});
const Transition = dynamic(() => import('@headlessui/react').then((mod) => mod.Transition), {
  ssr: false,
});

// Wrap the entire Modal component for client-side rendering only
const Modal = dynamic(() => import('@headlessui/react').then((mod) => {
  const ModalInner = ({ children, show, title, toggle }) => {
    return (
      <Transition appear as={Fragment} show={show}>
        <mod.Dialog
          className="fixed inset-0 z-50 overflow-y-auto text-gray-800"
          onClose={toggle}
        >
          <div className="flex items-center justify-center h-screen p-5">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <mod.Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>
            <span aria-hidden="true" className="inline-block align-middle">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block p-10 my-10 space-y-5 overflow-hidden text-left align-middle transition-all transform bg-white rounded shadow-xl">
                <mod.Dialog.Title as="h2" className="text-2xl font-bold leading-5">
                  {title}
                </mod.Dialog.Title>
                {children}
                <button
                  className="absolute top-0 outline-none right-5"
                  onClick={toggle}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </mod.Dialog>
      </Transition>
    );
  };

  ModalInner.defaultProps = {
    show: false,
    subtitle: '',
    title: '',
    toggle: null,
  };

  return ModalInner;
}), {
  ssr: false,
});

export default Modal;
